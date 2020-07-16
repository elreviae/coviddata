function paramLookup(cell){
    var value = cell.getElement().classList.add("w3-metro-darken");
    return value;
}
var cellFormatNewDeaths =function(cell, formatterParams){ 
    var value = cell.getValue();
    if(value > 0 && value <= 49){
        cell.getElement().classList.add("w3-metro-dark-red", "w3-border-top");
        return '+' + value.toLocaleString();
    }else if (value >= 50 && value <= 99) {
        cell.getElement().classList.add("w3-metro-red", "w3-border-top");
        return '+' + value.toLocaleString();
    }else if (value >= 100 && value <= 500000) {
        cell.getElement().classList.add("w3-black", "w3-text-red", "w3-border-top");
        return '+' + value.toLocaleString();
    }else {
        return value.toLocaleString();
    }
};
var cellFormatNewCases =function(cell, formatterParams){ 
    var value = cell.getValue();
    if(value > 0 && value <= 499){
        cell.getElement().classList.add("w3-metro-yellow", "w3-border-top");
        return '+' + value.toLocaleString();
    }else if (value >= 500 && value <= 1499) {
        cell.getElement().classList.add("w3-metro-orange", "w3-border-top");
        return '+' + value.toLocaleString();
    }else if (value >= 1500 && value <= 500000) {
        cell.getElement().classList.add("w3-black", "w3-text-orange", "w3-border-top");
        return '+' + value.toLocaleString();
    }else {
        return value.toLocaleString();
    }
};
var cellFormatNewRecov =function(cell, formatterParams){ 
    var value = cell.getValue();
    if(value > 0 && value <= 499){
        cell.getElement().classList.add("w3-metro-light-green", "w3-border-top");
        return '+' + value.toLocaleString();
    }else if (value >= 500 && value <= 1499) {
        cell.getElement().classList.add("w3-metro-green", "w3-border-top");
        return '+' + value.toLocaleString();
    }else if (value >= 1500 && value <= 500000) {
        cell.getElement().classList.add("w3-metro-dark-green", "w3-text-lime", "w3-border-top");
        return '+' + value.toLocaleString();
    }else {
        return value.toLocaleString();
    }
};
var cellFormatterToLocString = function(cell, formatterParams){
    var value = cell.getValue();
    return value.toLocaleString();
};
var displayDate=function(cell){
    var celldateValue = cell.getValue();
    return moment(celldateValue).format("MM/DD/YY-h:mm A");
};