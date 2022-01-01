export function descSort(property) {
    return function(a, b) {
        return (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0; //desc sort
    }
 }

 export function ascSort(property) {
  return function(a, b) {
      return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0; //desc sort
  }
}

 export function checkValidUrl(url) {
  var types = ['jpg','jpeg','tiff','png','gif','bmp'];
  var parts = url.split('.');
  var extension = parts[parts.length-1];
  if(types.indexOf(extension) !== -1) {
      return true;   
  }
  }
  

export function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
      month = '0' + month;
    }
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (hour.toString().length == 1) {
      hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
      minute = '0' + minute;
    }
    if (second.toString().length == 1) {
      second = '0' + second;
    }
    var dateTime = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
  }


  export function removeId(array){
    delete array["id"];
    return array
  }

  export const merge = (arr1, arr2) => {
    const temp = []
  
    arr1.forEach(x => {
      arr2.forEach(y => {
        if (x.userId === y.id) {
          temp.push({ ...y, ...x })
        }
      })
    })
  
    return temp
  }