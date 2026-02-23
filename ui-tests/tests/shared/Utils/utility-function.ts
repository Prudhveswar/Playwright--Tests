export abstract class UtilityFunction {
  /**
   * @param arrayCount - length of the array
   * @returns a random index from 0 to arrayCount - 1
   */
  static getRandomIndexFromAnArrayCount(arrayCount: number): number {
    return Math.floor(Math.random() * arrayCount);
  }
  
  /** 
   * @param min
   * @param max
   * @returns a random number between min and max (inclusive)
   */
  static getRandomNumberBetweenMinAndMax(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * @param array - an array of items
   * @returns a random item from the array
   */
  static getRandomElementFromArray<Type>(array: Array<Type>): Type {
    return array[Math.floor(Math.random() * array.length)];
  }   

  static generateRandomId(): string {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000000);
    return `${timestamp}-${randomNum}`;
  } 
}