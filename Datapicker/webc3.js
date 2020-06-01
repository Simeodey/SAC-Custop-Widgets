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
            var dpicker = sap.m.DatePicker;
            this.DP = new dpicker().addStyleClass("datePicker");
            this.DP.placeAt(this);
	console.log(this);
        }

        

 
    }

    customElements.define('ui5-datepicker', DatePicker);
})();
