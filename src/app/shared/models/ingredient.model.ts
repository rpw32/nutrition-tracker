export class Ingredient {
   name: string;
   qty: string;
   unit: string;
   isOwned: boolean;

   constructor(init?: Partial<Ingredient>) {
      Object.assign(this, init);
   }
}
