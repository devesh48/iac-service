const HandleBars = require('handlebars');
const clean = require('clean-deep');


class HandleBarsUtility {
    init(){
        this.filteredEventDetails = null;
    }

    handleEvent(message, EventTemplate){
        var me = this;
        try {
            me.eventTemplate = HandleBars.compile(JSON.stringify(EventTemplate));
            me.filteredEventDetails = JSON.parse(me.eventTemplate(message));
            me.filteredEventDetails = clean(me.filteredEventDetails);
            return me.filteredEventDetails;
        } catch(err){
            throw err;
        }
    }
}

module.exports = new HandleBarsUtility;