function taxCalculation(person) {
    
    var taxPercent = 0
      if (person <= 10275) {
        taxPercent = .1
      }
      if (person >= 10276 && person <= 41775) {
        taxPercent = .12
      } if (person >= 41776 && person <= 89075) {
        taxPercent = .22
      } if (person >= 89076 && person <= 170050) {
        taxPercent = .24
      } if (person >= 170051 && person <= 215950) {
        taxPercent = .32
      }
      if (person >= 215951 && person <= 539900) {
        taxPercent = .35
      }
      if (person >= 539901) {
        taxPercent = .37
      }
  
      return 1 - taxPercent
    } 

    export default taxCalculation