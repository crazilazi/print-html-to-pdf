'use strict';

class Spinner {
    constructor() {
        this.__init();
    }

    // Spin the spinner
    spin = () => {
        if (document.getElementById(this.spinnerId) === null || document.getElementById(this.spinnerId) === undefined) {
            document.body.appendChild(this.spinnerDiv);
        };
        const spinner = document.getElementById(this.spinnerId);
        this.spinnerDiv.style.height = `${document.body.scrollHeight}px`;
        this.spinnerDiv.style.display = "block";
    };

    // Spin the spinner
    stop = () => {
        if (document.getElementById(this.spinnerId) !== null) {
            const spinner = document.getElementById(this.spinnerId);
            this.spinnerDiv.style.display = "none";
        }
    };

    // Initialize the basic needs
    __init = () => {
        this.spinnerId = 'print-html-to-pdf-spinner-div';
        this.__initSpinner();
    };

    // Initialize the spinner
    __initSpinner = () => {
        this.spinnerDiv = document.createElement('div');
        this.spinnerDiv.id = this.spinnerId;

        this.spinnerDiv.style.position = "absolute";
        this.spinnerDiv.style.zIndex = "99999999";
        this.spinnerDiv.style.top = "0";
        this.spinnerDiv.style.left = "0";
        this.spinnerDiv.style.width = "100%";
        this.spinnerDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        this.spinnerDiv.style.display = "none";

        const spinnerImage = document.createElement('img');
        spinnerImage.style = "position: absolute; margin: 100px auto auto auto; inset: 0px;";
        spinnerImage.alt = "Printing pdf......";
        spinnerImage.src = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3Csvg xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.0' width='64px' height='64px' viewBox='0 0 128 128' xml:space='preserve'%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='%23FFFFFF' /%3E%3Cg%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23000000'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23cccccc' transform='rotate(30 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23cccccc' transform='rotate(60 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23cccccc' transform='rotate(90 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23cccccc' transform='rotate(120 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23b2b2b2' transform='rotate(150 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23999999' transform='rotate(180 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%237f7f7f' transform='rotate(210 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23666666' transform='rotate(240 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%234c4c4c' transform='rotate(270 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23333333' transform='rotate(300 64 64)'/%3E%3Cpath d='M59.6 0h8v40h-8V0z' fill='%23191919' transform='rotate(330 64 64)'/%3E%3CanimateTransform attributeName='transform' type='rotate' values='0 64 64;30 64 64;60 64 64;90 64 64;120 64 64;150 64 64;180 64 64;210 64 64;240 64 64;270 64 64;300 64 64;330 64 64' calcMode='discrete' dur='1080ms' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/g%3E%3C/svg%3E";
        this.spinnerDiv.appendChild(spinnerImage);
    };
};

export default new Spinner();