class EventorUtils {
  static location = { x: 0, y: 0 }
  static getDateMinusMonth(date, monthCount = 1) {
    const month = date.getMonth();
    const year = date.getFullYear();

    // Calculate the total months to subtract
    const totalMonthsToSubtract = month + (year * 12);

    // Calculate the new total months after subtracting the specified months
    const newTotalMonths = totalMonthsToSubtract - monthCount;

    // Calculate the new year and month from the new total months
    const newYear = Math.floor(newTotalMonths / 12);
    const newMonth = newTotalMonths % 12;

    // Create a new Date object with the updated month, year, and the same date of the month
    const newDate = new Date(newYear, newMonth, date.getDate());

    return newDate;
  }

  static getDatePlusMonth(date, monthCount = 1) {
    const month = date.getMonth();
    const year = date.getFullYear();

    // Calculate the total months to subtract
    const totalMonthsToSubtract = month + (year * 12);

    // Calculate the new total months after subtracting the specified months
    const newTotalMonths = totalMonthsToSubtract + monthCount;

    // Calculate the new year and month from the new total months
    const newYear = Math.floor(newTotalMonths / 12);
    const newMonth = newTotalMonths % 12;

    // Create a new Date object with the updated month, year, and the same date of the month
    const newDate = new Date(newYear, newMonth, date.getDate());

    return newDate;
  }

  static isDateToday(date) {
    // Get the current date
    const today = new Date();
    const dateIn = new Date(date);

    // Compare year, month, and day of the input date with today's date
    const isToday = (
      dateIn.getFullYear() === today.getFullYear() &&
      dateIn.getMonth() === today.getMonth() &&
      dateIn.getUTCDate() === today.getUTCDate()
      );

    return isToday;
  }

  updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
      tempArray = additionalURL.split("&");
      for (var i = 0; i < tempArray.length; i++) {
        if (tempArray[i].split('=')[0] != param) {
          newAdditionalURL += temp + tempArray[i];
          temp = "&";
        }
      }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
  }

  addParam(v) {
    var newURL = updateURLParameter(window.location.href, 'locId', 'newLoc');
    newURL = updateURLParameter(newURL, 'resId', 'newResId');

    window.history.replaceState('', '', updateURLParameter(window.location.href, "t", v));
    location.reload();
  }


  static getMonthColor($num) {
    const monthColors = [
      '#e1a7ed', // January 
      '#a7b1ed', // February
      '#a7cbed', // March
      '#a7e8ed', // April 
      '#9bf1d8', // May 
      '#99ebb5', // June 
      '#c3eda7', // July 
      '#eaf1a2', // August
      '#ede6a7', // September
      '#edd0a7', // October
      '#edb6a7', // November
      '#eda7bf', // December
    ];
    $num;
    return monthColors[$num];
  }

  static getCurrentDateAsString() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static getDateAsString(currentDate) {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  static getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(EventorUtils.setPosition, EventorUtils.showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  static setPosition(position) {
    console.log("Latitude:", position.coords.latitude);
    console.log("Longitude:", position.coords.longitude);

    EventorUtils.location.x = position.coords.latitude;
    EventorUtils.location.y = position.coords.longitude;
    console.log("Location:", EventorUtils.location);
  }

  static showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }

  static getNextMonth(date) {
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const day = new Date(date).getDate();

    return new Date(year, month + 1, 1);
  }

  static getPrevMonth(date) {
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();
    const day = new Date(date).getDate();

    return new Date(year, month - 1, day);
  }

  static changeAddressBar(param, value) {
    // Get the current URL and its search params
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);

    // Set a new value for a specific parameter
    searchParams.set(param, value);

    // Update the URL with the modified search params
    url.search = searchParams.toString();
    window.history.pushState({}, '', url);
  }

  static getParam(param, clearHash = true) {
    const params = new URLSearchParams(window.location.href);
    console.log(params);
    if (params.has(param)) {
      let paramValue = params.get(param);
      // Decode the URL parameter value
      if (clearHash){
        paramValue = paramValue.replace('#', '');
      }
      console.log('param: ' + paramValue);
      return decodeURIComponent(paramValue);
    }
    return null;
  }

  static getSimpleDate(date, realize = false) {
    let relizer = 0;
    if (realize) {
      relizer = 1;
    }
    const month = String(new Date(date).getUTCMonth() + relizer).padStart(2, 0);
    const year = new Date(date).getFullYear();
    const day = String(new Date(date).getUTCDate()).padStart(2, 0);

    return (year + "-" + month + "-" + day);
  }

  static getFirstDayOfMonth(date, simplify = false, plusmonth = 0) {
    const month = new Date(date).getUTCMonth() + plusmonth;
    const year = new Date(date).getFullYear();
    if (simplify) {
      return (year + "-" + String(month + 1).padStart(2, 0) + "-" + "01");
    }
    return new Date(year, month, 1);
  }

  static getLastDayOfMonth(date, simplify = false, plusmonths = 0) {
    const month = new Date(date).getMonth() + plusmonths;
    const year = new Date(date).getFullYear();
    let nd = new Date(year, month + 1, 1); // Set day to 1 for the next month
    nd.setDate(nd.getDate() - 1); // Subtract 1 day to get the last day of the current month
    const day = String(nd.getUTCDate()).padStart(2, '0');
    if (simplify) {
      return year + "-" + String(nd.getMonth() + 1).padStart(2, '0') + "-" + day;
    }
    return nd;
  }



  static getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName.trim() === name) {
        return cookieValue;
      }
    }
    return null;
  }

  // saveCookie(key, value, expired = 7){
  //   // Save the user input to a cookie named 'userDraft'
  //   setCookie(key, value, expired); // Expires in 7 days (adjust as needed)
  //   // Perform any other necessary actions, e.g., send the data to the server.
  // }


  static setCookie(name, value, days = 7) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }
}