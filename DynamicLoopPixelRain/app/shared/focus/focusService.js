angular.module("pixelRainApp.services").factory("focusService",
    function () {
        return new FocusService();
    }
);

function FocusService() {
    this.lockFocusOnKeyInput = function () {
        var element = $(FocusService.keyInputSelector);
        if (element) {
            element.click(function () { $(this).focus().bind('blur', function () { $(this).focus(); }); });
            element.trigger('click');
        }
    };

    this.unlockFocusOnKeyInput = function () {
        var element = $(FocusService.keyInputSelector);
        if (element) {
            element.unbind();
            element.blur();
        }
    };
};

FocusService.keyInputSelector = "#key_input";