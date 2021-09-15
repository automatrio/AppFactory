import { Injectable } from '@angular/core';
import { Binding } from 'src/app/common/models/binding';

@Injectable({
  providedIn: 'root'
})
export class DataBindingService {

  constructor() { }

  public createBinding(binding: Binding) {

    const inputData = binding.inputSlot.parentNode.data;
    const outputData = binding.outputSlot.parentNode.data;

    const inputPropertiesKeys = Object.keys(inputData);
    const outputPropertyName = binding.outputSlot.parentNode.nodeType;

    console.log("inpropr", inputPropertiesKeys)
    console.log("outpropr", outputPropertyName)   
    
    inputPropertiesKeys.forEach(prop => {
      if(prop == outputPropertyName) {
        inputData[outputPropertyName] = outputData;
        console.log("inputData[outputPropertyName]", inputData[outputPropertyName]);
        console.log("outputData", outputData);
        
      }
    });

    console.log(inputData);
  }

  private nameof<T>(name: Extract<keyof T, string>): string {
    return name;
  }
}
