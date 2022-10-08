interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type Animal = Cat | Dog
type Key<K> = K
type LookUp<U, T> = U extends {type: T} ? Cat : never;
type MyDog = LookUp<Animal, 'dog'> // expected to be `Dog`
type A = {type:'dog'}

type B = Dog extends A?Dog:Cat

let a:Animal = {
  type: 'dog',
  breeds: 'Brittany',
  color: 'brown'
}