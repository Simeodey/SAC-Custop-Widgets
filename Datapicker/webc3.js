(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <div id="ui5_content" name="ui5_content">
         <slot name="content"></slot>
        </div>  
`;


    class DatePicker extends HTMLElement {
        constructor() {
            super();
            let _shadowRoot = this.attachShadow({
                mode: "open"
            });
            _shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = false;
        }
        
          connectedCallback(){
          
        }

        disconnectedCallback(){
        
        }

		onCustomWidgetBeforeUpdate(oChangedProperties) {

		}

		onCustomWidgetAfterUpdate(oChangedProperties) {
           console.log(1);
                this.load();
           
        }
        
        onCustomWidgetDestroy(){
        
        }

        
    
        load() {
         let content = document.createElement('div');
	content.slot = "content";
	this.appendChild(content);
            var dpicker = sap.m.DatePicker;
            this.DP = new dpicker({
                change: function () {
                    this.changed();
                    this.dispatchEvent(new Event("onChange"));
                }.bind(this)
            }).addStyleClass("datePicker");
		//this.DP.setPlaceholder("MMM d y");
		//this.DP.setDisplayFormatType("dd.MM.YYYY");
		console.log(this.DP.getDateValue());
            this.DP.placeAt(content);

        }

        changed() {
            var properties = { date: this.DP.getDateValue() };
		console.log(this);
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
