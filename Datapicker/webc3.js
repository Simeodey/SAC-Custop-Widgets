(function () {
	let shadowRoot;
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `    
`;

    class DatePicker extends HTMLElement {
        constructor() {
            super();
            shadowRoot = this.attachShadow({
                mode: "open"
            });
           shadowRoot.appendChild(tmpl.content.cloneNode(true));
            
        }
        
          connectedCallback(){
            this.init(); 
        }

         
        disconnectedCallback(){
        
        }

         
		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

       
		onCustomWidgetAfterUpdate(oChangedProperties) {

                this.init();
            
        }
        
        
        onCustomWidgetDestroy(){
        
        }
    
        init() {
            if (this.children.length === 2) return;
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

    customElements.define('ui5-datepicker', DatePicker);
})();
