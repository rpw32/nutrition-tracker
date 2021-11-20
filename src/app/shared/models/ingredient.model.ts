
export class Ingredient {
   name: string;
   qty: string;
   unit: string;
   isOwned: boolean;

   constructor(init?: Partial<Ingredient>) {
      this.name = init.name;
      this.qty = init.qty;
      this.unit = init.unit;
      this.isOwned = init.isOwned;
      return this;
   }
}
