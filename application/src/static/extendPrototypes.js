'use strict'

HTMLButtonElement.prototype.disable = function () {
    this.classList.add('disabled')
    this.disabled = "disabled"
}

HTMLButtonElement.prototype.enable = function () {
    this.classList.remove('disabled')
    this.removeAttribute('disabled')
}