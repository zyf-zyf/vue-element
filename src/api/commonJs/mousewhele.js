
    var passiveSupported = false;
    try {
          var options = Object.defineProperty({}, "passive", {
              get: function() {
                  passiveSupported = true;
              }
          });
          window.addEventListener("test", null, options);
    } catch(err) {}
    function fn() {
        console.log("fn")
    }
    document.addEventListener("mousewheel", fn, passiveSupported ? { passive: true } : false)