(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `   <style>	
    body {

    }
    </style>  
`;

    class DatePicker extends HTMLElement {
        constructor() {
            super();
            this.init();
        }
        

        init() {
            if (this.children.length === 2) return;
            if (!this.querySelector("link")) {
                this.appendChild(tmpl.content.cloneNode(true));
            }
            var dpicker = sap.m.DatePicker;
            this.DP = new dpicker({
                change: function () {
                    this.fireChanged();
                    this.dispatchEvent(new Event("onChange"));
                }.bind(this)
            }).addStyleClass("datePicker");
            this.DP.placeAt(this);
        }

        fireChanged() {
            var properties = { date: this.DP.getDateValue(),
                             format: 'yy-mm-dd' };
            this.dispatchEvent(new CustomEvent("propertiesChanged", {
                detail: {
                    properties: properties
                }
            }));
        }

        set date(value) {
            if (value == undefined || !this.DP) return;
            if (typeof (value) === "string") value = new Date(value);
            this.DP.setDateValue(value);
        }
    }

    customElements.define('nkappler-date-picker', DatePicker);
})();
