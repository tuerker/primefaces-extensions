/**
 * PrimeFaces Extensions InputPhone Widget.
 *
 * @author Jasper de Vries jepsar@gmail.com
 * @since 7.0
 */
PrimeFaces.widget.ExtInputPhone = PrimeFaces.widget.BaseWidget.extend({

    /**
     * Initializes the widget.
     *
     * @param {object}
     *            cfg The widget configuration.
     */
    init: function (cfg) {
        this._super(cfg);
        this.id = cfg.id;
        this.cfg = cfg;
        this.disabled = cfg.disabled;

        // JQuery inputs
        this.inputJq = $(this.jqId + '_input');
        this.inputIso2Jq = $(this.jqId + '_iso2');

        // pfs metadata
        this.inputJq.data(PrimeFaces.CLIENT_ID_DATA, this.id);

        // style disabled if necessary
        if (this.disabled) {
            this.inputJq.attr("disabled", "disabled");
            this.inputJq.addClass("ui-state-disabled");
            this.inputIso2Jq.attr("disabled", "disabled");
        }

        // visual effects
        PrimeFaces.skinInput(this.inputJq);

        // component creation
        this.input = this.inputJq[0];
        this.iti = intlTelInput(this.input, cfg);

        this.bindEvents();
    },

    bindEvents: function () {
        var $this = this;

        this.input.addEventListener('countrychange', function () {
            var country = $this.iti.getSelectedCountryData();
            $this.inputIso2Jq.val(country.iso2);
            if ($this.hasBehavior('countrySelect')) {
                var ext = {
                    params: [{
                        name: $this.id + '_name',
                        value: country.name
                    }, {
                        name: $this.id + '_iso2',
                        value: country.iso2
                    }, {
                        name: $this.id + '_dialCode',
                        value: country.dialCode
                    }]
                };
                $this.callBehavior('countrySelect', ext);
            }
        });
    },

    /**
     * Get the current number in the given format.
     */
    getNumber: function () {
        if (this.iti) {
            return this.iti.getNumber();
        }
        return '';
    },

    /**
     * Insert a number, and update the selected flag accordingly. Note that if
     * formatOnDisplay is enabled, this will attempt to format the number
     * according to the nationalMode option.
     *
     * @param number
     *            The value to set
     */
    setNumber: function (number) {
        if (this.iti) {
            this.iti.setNumber(number);
        }
    },

    /**
     * Get the country data for the currently selected flag.
     */
    getCountry: function () {
        if (this.iti) {
            return this.iti.getSelectedCountryData();
        }
        return '';
    },

    /**
     * Change the country selection (e.g. when the user is entering their
     * address).
     *
     * @param country
     *            The country code
     */
    setCountry: function (country) {
        if (this.iti) {
            this.iti.setCountry(country);
        }
    },

    /**
     * Change the placeholderNumberType option.
     *
     * @param type
     *            the new type like "FIXED_LINE"
     */
    setPlaceholderNumberType: function (type) {
        if (this.iti) {
            this.iti.setPlaceholderNumberType(type);
        }
    },

    /**
     * Validate the current number
     *
     * @return true if valid, false if not
     */
    isValidNumber: function () {
        if (this.iti) {
            return this.iti.isValidNumber();
        }
    },

    /**
     * Get more information about a validation error. Can look up the error code
     * in utils.js.
     */
    getValidationError: function () {
        if (this.iti) {
            return this.iti.getValidationError();
        }
        return 0;
    },

    /**
     * Focus the component by focusing on the correct input box.
     */
    focus: function () {
        this.inputJq.focus();
    },

    /**
     * Enable the input
     */
    enable: function () {
        PrimeFaces.utils.enableInputWidget(this.inputJq);
        PrimeFaces.utils.enableInputWidget(this.inputIso2Jq);
        this.disabled = false;
    },

    /**
     * Disable the input
     */
    disable: function () {
        PrimeFaces.utils.disableInputWidget(this.inputJq);
        PrimeFaces.utils.disableInputWidget(this.inputIso2Jq);
        this.disabled = true;
    },

    // @override
    refresh: function (cfg) {
        if (this.iti) {
            this.iti.destroy();
        }
        this._super(cfg);
    },

    // @override
    destroy: function () {
        this._super();
        if (this.iti) {
            this.iti.destroy();
        }
    }

});
