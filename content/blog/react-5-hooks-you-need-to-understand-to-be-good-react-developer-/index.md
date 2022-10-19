---
title: 'React hooks: 5 hooks you need to understand to be a good React developer'
date: '2022-10-19T15:00:00.00Z'
description: 'The interview procedure is like a game of chess. You need to do the...'
isStcArticle: false
stcUrl: ''
---

Hooks can be very tricky to understand on the first try. When I started working with React, I was focused on how to use hooks, not knowing how they work. 

I know it's possible to do your job without even fully knowing them, as I spoke with a bunch of developers who are working in the industry for many years yet they don’t fully grasp them or have blind spots in knowledge.

Due to that, I have decided to write an article which explains how they work and how you can use them. Some of the content will cover the foundations but I will tell about more advanced stuff as well. So to be clear this is not the guide on how to **use** these hooks, but to **understand** them. 

![hooks](./hooks.jpg)

## Component anatomy 

For examples and explanations, we will use a simple card component, which shows some text and can be liked/unliked by the user. Nothing spectacular but it is enough for demonstration purposes.

```jsx

import { FC, useState, useMemo, useCallback } from 'react'
import HeartFull from './heartFull'
import HeartEmpty from './heartEmpty'

interface FoodCardProps {
  title: string
  description: string
}

export const FoodCard: FC<FoodCardProps> = ({ title, description }) => {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
  }

  return (
    <section>
      <h3>{title}</h3>
      <div>{description}</div>
      {liked ? <HeartFull onClick={toggleLike} /> : <HeartEmpty onClick={toggleLike} />}
    </section>
  )
}

```

We all know that the modern React component is a function, so we are going to skip class-based components and stick to function-based components. 

The function which defines a component is executed when React renders the component. It does some computations and may make some hook calls before returning some JSX content. React takes that JSX content and renders it.

When React gets a signal that components need to rerender, a function that defines the component will be executed again. All the stuff you put inside the component will get created again, which means constants and functions will be created again and hooks will be called again. After that JSX is constructed and returned.

The question is how React knows when components should be re-rendered. There are 2 main reasons why a component is re-rendered:
1. When the parent component is re-rendered
2. One of the component's ```useState``` setter functions is called (will be explained below)

So when any of these conditions are satisfied, the component is re-rendered. There are some exceptions when you are using ```React.memo()``` in the component, and the first condition is met. In that case, props will be first compared, and if they are the same, the component won’t be re-rendered.

# 1) useState

We all know that ```useState``` is used to set and get specific values that your component needs. Usage is pretty straightforward, but since this is a hook that can tell React that component needs to re-render it is special and very important. We will use a ```FoodCard``` component as an example from above:
1. Every time ```FoodCard``` is rendered (first time and every other time), ```useState``` is called and the value ```false``` is set again. Even if liked value is changed and set to ```true```
2. If ```useState``` value is constructed with some expression, for example: ```useState({myProperty: x + y})```, this expression will be evaluated whenever the component is rendered. To repeat the statement from the first point, even if the value has been changed to something different. The new object will be thrown away, after each re-render.
3. If the value that is stored in ```useState``` has not changed but the component is re-rending due to other reasons (parent component re-render or other ```useState``` had its state changed), then the 2 values returned from the ```useState``` (in our example ```liked``` and ```setLiked```) will be the same 2 values as before. To be precisely clear, in our example ```setLiked``` will not just be the function that does the same thing as it was doing previously, but it will be the same function instance. You will see below why this is important.

When we call ```useState```, we think that this is just for declaring some variables, but this is code that is called over and over again when the component re-renders. This is made by React team intentionally and is just a basic characteristic of this hook.

# 2) useEffect

This hook is used when we want to trigger some side-effect outside of React's normal flow. Usually, this is a network request to fetch data from the backend, or localStorage, or to log something, and stuff like that. So let’s modify our example a bit:

```jsx

export const FoodCard: FC<FoodCardProps> = ({ title, description }) => {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
  }

  useEffect(() => {
    if (liked) {
      Logger.log(`Card ${title} liked!`)
    } else {
      Logger.log(`Card ${title} unliked!`)
    }
  }, [liked, title])

  return (
    <section>
      <h3>{title}</h3>
      <div>{description}</div>
      {liked ? <HeartFull onClick={toggleLike} /> : <HeartEmpty onClick={toggleLike} />}
    </section>
  )
}

```

If you wonder why we put this in ```useEffect``` instead of the just component body so that it gets called every render cycle, that's a good question.

Technically, we can do that, but there are 2 arguments why we shouldn’t:
1. If we separate it in useEffect hook it gives React component better flexibility based on how React schedules work
2. ```useEffect``` hook gives us more control over the same effect when it should or should not happen

In the explanation of the ```useState``` hook, I said that the component will re-render when the parent component is rendered and when any ```useState``` setter is called. So take that into account, we don’t want to log function to be called every time a component re-renders. We want to see in our logs when the user is interacting with our UI, liking and unliking stuff. We don’t care when re-render happens.

One important thing to mention is that the ```useEffect``` hook offers you a dependency array (in our example we see that ```liked``` and ```title``` are in it). So every time a component re-renders it sets up ```useEffect``` again, and it passes the dependency array again. After that, it compares the corresponding item in the dependency array with the item from the dependency array from the previous render.

If no items in the dependency array have changed, it skips running the effect we defined in it. Because of this behavior, every item/variable that is used in the effect must be in the dependency array. It tells the hook: *if you will do the same thing that you did the last time, don’t bother*.

# 3) useMemo

Before we talk about this one, we need to explain how JavaScript compares values. Take this example:

```javascript
true === true       // true
7 === 7             // true
'react' === 'react' // true

[1, 2, 3] === [1, 2, 3] // false

const objA = { name: 'react' }
const objB = { name: 'react' }
objA === objB // false

const funA = () => console.log('react')
const funB = () => console.log('react')
funA === funB // false
```

As you can see, all **primitive** types are compared “by value”, while **non-primitive** types are compared “by reference”. React is also comparing dependency array items from the ```useEffect``` hook with shallow comparison, basically using the ```===``` operator.

So if we take a look at the above example, we can say that if you declare 2 identical arrays, objects, or functions, they are just 2 variables that look the same, but are not equal. 

This rule also applies to our objects, arrays, or function that we declare in React component. With each render cycle, they are different instances, not equal to ones from the previous render cycle.

Let's modify our example a little bit:

```jsx
export const FoodCard: FC<FoodCardProps> = ({ title, description }) => {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
  }

  const logPayload = { title, description, liked }

  useEffect(() => {
    Logger.log(logPayload)
  }, [logPayload])

  return (
    <section>
      <h3>{title}</h3>
      <div>{description}</div>
      {liked ? <HeartFull onClick={toggleLike} /> : <HeartEmpty onClick={toggleLike} />}
    </section>
  )
}
```

Looking at this code, we can see that the ```logPayload``` object will be created as a new instance on each re-render cycle. That will result in passing a new object in the dependency array for ```useEffect```. To conclude, as we pass a new object every time, the ```useEffect``` is running on each re-render.

What we need to do is to tell React: *if nothing changed from the title, description, or liked, give me the same object as the last render cycle*. And this is where the ```useMemo``` hook comes in handy:

```jsx
export const FoodCard: FC<FoodCardProps> = ({ title, description }) => {
  const [liked, setLiked] = useState(false)

  const toggleLike = () => {
    setLiked(!liked)
  }

  const logPayload = useMemo(() => {
    return { title, description, liked }
  }, [title, description, liked])

  useEffect(() => {
    Logger.log(logPayload)
  }, [logPayload])

  return (
    <section>
      <h3>{title}</h3>
      <div>{description}</div>
      {liked ? <HeartFull onClick={toggleLike} /> : <HeartEmpty onClick={toggleLike} />}
    </section>
  )
}
```

We can conclude that if the ```title```, ```description```, and ```liked``` variables don’t change, the ```logPayload``` will be the same after the next re-render cycle occurs.

2 things we should notice on ```useMemo```:
1. It has a dependency array, just like ```useEffect```, so it can compare if any of the source materials which construct an object, has changed. If yes, a new instance of an object will be created on the re-render cycle.
2. ```useMemo``` accepts a function that returns some value and not just an expression. This is intentional because this way ```useMemo``` can wait until the dependency array check is completed and then evaluate the expression, as it will return the same value as in the previous render cycle.

```useMemo``` can be used to control the changes/new values used in dependency arrays because those will trigger the effect. 

Another fancy thing is that it won’t generate new value unless it is needed. This comes in handy in some heavy computations or calculations in large data sets based on other data because there is no need for that component to do the work unless it’s needed. If you give ```useMemo``` the right set of data in the dependency array it will only work when the result will be different.

# 4) useCallback

There is not much difference between ```useMemo``` and ```useCallback```, so here we can compare them, which is doing the same thing:

```jsx
  const useMemoExample = useMemo(() => {
    return () => setLiked(true)
  }, [setLiked])

  const useCallbackExample = useCallback(() => setLiked(true), [setLiked])
```

It is not hard to notice that the second example is more elegant for usage in comparison to the first one. React team did this intentionally as they knew that memoizing a function will be a common case. They knew that creating a function will never be a costly operation that must be postponed until we've determined whether it's required.

So they made this one more elegant. Instead of passing a function that returns a value that will be memoized (another function in our case), you can just pass the function reference itself. It only works if the value is a function, not something else.

A part of that one small difference, it is the same as ```useMemo``` and has the same dependency array mechanism which behaves the same as explained in the ```useMemo``` section.

# 5) useRef

Simply explained ```useRef``` hook is used to create references to DOM elements that you need to perform some actions on them or to create mutable, persistent values that you want to change over time. Most of the time you won’t need to use this hook, but there will be some use cases where it will save you.

Let’s take a look at this example:

```jsx
export const Button = () => {
  const countRef = useRef(0)

  const onClickHandler = () => {
    countRef.current++
    console.log(`Clicked ${countRef.current} times!`)
  }

  console.log('I rendered!')

  return <button onClick={onClickHandler}>Click me</button>
}
```

In the above example, we can see that ```useRef``` is a built-in React hook that accepts one argument as an initial value and return a reference. A reference is just an object with a special property called ```current```.

Accessing this property like this ```countRef.current```, will give you a reference value. Updating this property like this ```countRef.current = 5```, will update the reference value.

There are also 2 rules you need to remember while working with references:
1. The value of reference persists (stays the same) through component re-render cycles.
2. Updating the reference value doesn’t trigger component re-rendering.

In the above example, we can see that ```countRef``` is created with an initial value of 0. When the button is clicked, the ```onClickHandler``` function is executed and the reference value is incremented. Also, the reference value is logged into the console.

Updating the reference value will not trigger re-rendering and we have a proof for that because the message *I rendered* will be logged to the console only once.

Now you probably ask yourself, why we don’t use the ```useState``` hook here? And that’s a good question. Let’s modify our example with ```useState``` :

```jsx
export const Button = () => {
  const [count, setCount] = useState(0)

  const onClickHandler = () => {
    const newCount = count + 1
    console.log(`Clicked ${newCount} times!`)
    setCount(newCount)
  }

  console.log('I rendered!')

  return <button onClick={onClickHandler}>Click me</button>
}
```

Now you can see that each time you click on the button, the message *I rendered* will blast in the console, which means that component updated the state and re-rendered.

To repeat, updating the reference value won’t trigger the component re-render while updating the state triggers. 

One important thing to remember is also that update of the reference value is **synchronous**, meaning the value is available right away. On the other hand, updating the state value is **asynchronous**, which means the state variable is updated in the next render cycle.

Another use case where you can use the ```useRef``` hook is when you want to access the DOM element for some reason (which is not often the case):

```jsx
export const TextDiv = () => {
  const divRef = useRef(null)

  useEffect(() => {
    const divElement = divRef.current
    console.log(divElement) // logs <div>This is text div!</div>
  }, [])

  return <div ref={divRef}>This is text div!</div>
}
```

You can also use it to set focus on the input element:

```jsx
export const Input = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      console.log(inputRef.current) // logs HTMLInputElement
      inputRef.current.focus()
    }
  }, [])

  // logs undefined during initial rendering
  console.log(inputRef.current)

  return <input ref={inputRef} type='text' />
}
```

In this example, you will notice that on initial rendering of component ```inputRef.current``` will print ```undefined```. That’s because during initial rendering React still needs to determine the output of the component and there is no DOM structure created yet. As the ```useEffect``` hook executes right after mounting the component, the input element is created in the DOM tree and then we can see the output.

# Bonus: custom hooks

I see often things like this in components:

```jsx
import { useState, useEffect } from 'react'

interface Patient {
  id: string
  avatarUrl: string
  fullName: string
  isDeactivated: boolean
}

export const ActivePatientsList = () => {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    const loadPatients = async () => {
      const response = await fetch('https://some-api')
      const data = await response.json()
      setPatients(data)
    }
    loadPatients()
  }, [])

  return (
    <ul>
      {patients
        .filter((patient) => !patient.isDeactivated)
        .map((patient) => (
          <li key={patient.id}>
            <img src={patient.avatarUrl} />
            <p>{patient.fullName}</p>
          </li>
        ))}
    </ul>
  )
}
```

This component is not very large but polluting the component with fetching data is not good practice, so why not create our custom hook and extract this piece of logic in it? You will extract this in a separate file under the ```hooks``` directory, or something like that, but for better visibility, here is all code together.

```jsx
import { useState, useEffect } from 'react'

interface Patient {
  id: string
  avatarUrl: string
  fullName: string
  isDeactivated: boolean
}

const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    const loadPatients = async () => {
      const response = await fetch('https://some-api')
      const data = await response.json()
      setPatients(data)
    }
    loadPatients()
  }, [])

  return { patients }
}

export const ActivePatientsList = () => {
  const { patients } = usePatients()

  return (
    <ul>
      {patients
        .filter((patient) => !patient.isDeactivated)
        .map((patient) => (
          <li key={patient.id}>
            <img src={patient.avatarUrl} />
            <p>{patient.fullName}</p>
          </li>
        ))}
    </ul>
  )
}
```

Much better, isn’t it? Our main component looks much shorter, as we extracted logic into our custom hook. We also eliminated structural hooks like ```useEffect``` inside the component and positioned them into our custom hook, which makes everything more readable and clean.

# Conclusion

One of the most challenging things about hooks, in my opinion, is the fact that, despite how they appear and behave, they are essentially function calls that happen over and over again. The items that will and won't cause a re-render can also be difficult to predict. 

This could be a bit exhaustive on first look but if you understand this it will help you with React code because I attempted to concentrate on the problems that I've seen people stumble over in their day-to-day work.

Master these hooks and you will feel 100 times more confident with your React skills!

