// Teftele math evaluator for inputs
/**
 * Version 0.1
 * Designed by Adam Janson
 * <input type='text' class='addmathstrictcalc onlymath' roundmap='3' value='670+2000+450+1350'>
 */
class TeleInput
{
  constructor(){
    document.addEventListener('input', (e) => {
    // filter input to mathNumeric  
    if (e.target.classList.contains('onlymath')){
      //TeleInput.filterMathInput(e.target);
    };
     
    // calculate if contains math operators  
    if (e.target.classList.contains('addmathstrictcalc')){
      this.tryMath(e.target);
    };

    if (e.target.classList.contains('addmathevaluate')){
        this.tryEvaluate(e.target);
      };
      
  });
  }
  
  static filterMathInput(input)
  {
    let text = input.value;
    // Define a regular expression pattern that matches the allowed characters
    var pattern = /[0987654321*+\-=()% ]/g;
    // Use the pattern to filter out unwanted characters
    var filtered = text.match(pattern);
    // Join the filtered characters back together to create the new string 
    input.value = filtered ? filtered.join('') : '';
    
  }
  
   static trimTrailingZeros(value) {
    // Convert the value to a float and then back to a string
    // This helps in removing trailing zeros and also handles scientific notation
    return parseFloat(value).toString();
     
  }
  
  tryMath(input)
  {
   let text = input.value;
      if (text.includes('=') || text.includes(' ')) {
        try {
          
          text = text.replace('=', '');
          text = text.replace(' ', '');
          // Evaluate the mathematical expression
          let result = eval(text);
          // Set the result back to the input
          // Get the roundmap attribute value
        let roundmap = input.getAttribute('roundmap');
        if (roundmap) {
          let roundedResult = parseFloat(result).toFixed(parseInt(roundmap, 10));
         input.value = TeleInput.trimTrailingZeros(roundedResult);
        } else {
          // Trim trailing zeros
          input.value = TeleInput.trimTrailingZeros(result);
        }
        } catch (error) {
          // If there's an error in the expression, leave the input unchanged
        }
      }
  }

  // evaluate when meet `=?` within the string
  tryEvaluate(textarea) {
    const text = textarea.value;
    const pattern = /([\d.+\-*/]+)(\=\?)/g; // Match expressions ending with =?
  
    const updatedText = text.replace(pattern, (match, expression) => {
      try {
        const result = eval(expression);
        const roundmap = textarea.getAttribute('roundmap');
        let formattedResult = result.toFixed(roundmap ? parseInt(roundmap, 10) : 2);
        formattedResult = TeleInput.trimTrailingZeros(formattedResult); // Trim trailing zeros
        return `${expression}=${formattedResult}`;
      } catch (error) {
        // If there's an error in the expression, leave it unchanged
        return match;
      }
    });
  
    textarea.value = updatedText;
    }

};


var TeleInputInstance = new TeleInput();
{/* <textarea class='addmathevaluate' roundmap='3'>Some text many text and 670+2000+450+1350= ololo haha</textarea> */}