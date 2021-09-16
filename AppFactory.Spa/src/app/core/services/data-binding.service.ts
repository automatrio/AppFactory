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

    inputPropertiesKeys.forEach(prop => {
      if(prop == outputPropertyName) {
        inputData[outputPropertyName] = outputData; 
      }
    });

    const boundNodeProperty = binding.inputSlot.parentNode.properties.find(prop => prop.binding == outputPropertyName);
    boundNodeProperty!.isBoundTo = binding.outputSlot.parentNode;
  }

  private nameof<T>(name: Extract<keyof T, string>): string {
    return name;
  }
}
