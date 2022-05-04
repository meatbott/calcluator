//App.js//
/*  Requirements: (copied from the Odin page)

    Here are some use cases (abilities your project needs to have):
    Your calculator is going to contain functions for all of the basic math operators you typically find on simple
     calculators, so start by creating functions for the following items and testing them in your browser’s console.
        add
        subtract
        multiply
        divide
    Create a new function operate that takes an operator and 2 numbers and then calls one of the above functions
    on the numbers.
    Create a basic HTML calculator with buttons for each digit, each of the above functions and an “Equals” key.
        Do not worry about wiring up the JS just yet.
        There should also be a display for the calculator, go ahead and fill it with some dummy numbers so you
        can get it looking right.
        Add a “clear” button.
    Create the functions that populate the display when you click the number buttons… you should be storing the
    ‘display value’ in a variable somewhere for use in the next step.
    Make the calculator work! You’ll need to store the first number that is input into the calculator when a user
    presses an operator, and also save which operation has been chosen and then operate() on them when the user
    presses the “=” key.
        You should already have the code that can populate the display, so once operate() has been called, update
        the display with the ‘solution’ to the operation.
        This is the hardest part of the project. You need to figure out how to store all the values and call the
        operate function with them. Don’t feel bad if it takes you a while to figure out the logic.
    Gotchas: watch out for and fix these bugs if they show up in your code:
        Users should be able to string together several operations and get the right answer, with each pair of
        numbers being evaluated at a time. For example, 12 + 7 - 5 * 3 = should yield 42. An example of the behavior
        we’re looking for would be this student solution.
        Your calculator should not evaluate more than a single pair of numbers at a time. Example: you press a
        number button (12), followed by an operator button (+), a second number button (7), and finally a second
        operator button (-). Your calculator should then do the following: first, evaluate the first pair of
        numbers (12 + 7), second, display the result of that calculation (19), and finally, use that result (19)
        as the first number in your new calculation, along with the next operator (-).
        You should round answers with long decimals so that they don’t overflow the screen.
        Pressing = before entering all of the numbers or an operator could cause problems!
        Pressing “clear” should wipe out any existing data.. make sure the user is really starting fresh after
        pressing “clear”
        Display a snarky error message if the user tries to divide by 0… don’t let it crash your calculator!
    EXTRA CREDIT: Users can get floating point numbers if they do the math required to get one, but they can’t
    type them in yet. Add a . button and let users input decimals! Make sure you don’t let them type more than
    one though: 12.3.56.5. It is hard to do math on these numbers. (disable the decimal button if there’s
    already one in the display)
    EXTRA CREDIT: Make it look nice! This is a great project to practice your CSS skills. At least make the
    operations a different color from the keypad buttons.
    EXTRA CREDIT: Add a “backspace” button, so the user can undo if they click the wrong number.
    EXTRA CREDIT: Add keyboard support!



    Plan: 3 parts:
      1. structure. I am planning on using flexbox to make it easier. If the dimensions
      of the buttons are fixed then they shouldn't move around even if the screen is resized. I can look at simple
      calculators to get a semblance of what the basic design is for this type of thing. using button elements rather
      than interactive divs feels like a better idea. the equals sign ought to be larger than the other functions
      buttons.

      2. business logic. the actual calulations ought to be taken care of with native JS operations. I think the
      trick here is being able to store the variables in a manner that they can be reached, reused and properly handled.
      At this point it is all speculations but we shall see.

      3. styling. it ought to look like a calculator. I have seen some of the examples other students have built
      and while there are some good looking ones, there are also some *ugly* ones. I think a shadow might make
      the buttons appear 3D which would be nice. I think a basic color scheme is sufficient. Grey or dirty white
      body with white or light grey number buttons with reddish brown operations buttons. Classic style. Maybe Add
      and option to change the coloring or have light/dark modes. Perhaps a solar panel for flourish if time permits.
      Idea: base the design on a computer keyboard number pad. I would have a reference always available so that
      seems like a good way to have something to shoot for constantly.

      I will take as much time as I need but it would be nice if this project didn't take more than a week once I
      start slinging code. This preparation stuff seems to be helpful to even get anything started.

    Execution:
      Main div for whole page
      div for body of calculator flexbox format
        2 parts: the top with the display and the bottom with the buttons
        this could facilitate using flexbox for the bottom and not the top.
      div for display screen or to hold a text box
        maybe make a 2 part screen with the top showing each button pressed as a chain
        and the lower part the current value/result
      grid of 20 buttons with all numbers and operations
      option to either resize some buttons or just make certain buttons bigger than the others.

      Create a watcher function that listens to the buttons being pressed
      A holding array to store the values being pressed would be helpful to access the numbers and perform
      the caluculations.
      <var> <display> <calc> <var> <display> <result> <display>
      Tricky situations:
        handle non-number leading button presses.
      Initial display to hold a zero might help reduce some situations.
      Ensure the math is accurate...no JavaScript math with wonky results.

      Display styling:
        regular fonts or try to use a grid based style like actual calculators, like the bars/lines
        make up the numbers instead of a strict text. This would be harder to do but might be worth it
      default styling with option for dark mode or customized colors for buttons/button text
      Animations if I am really feeling it. Maybe to start the machine a button has all the other buttons
      flying in from differnt directions. The first time anyway...
*/

let calcBody = document.getElementById("calc-body");
    topScreen = document.getElementById("top-screen");
    displayScreen = document.getElementById("display-screen");
    buttonField = document.getElementById("button-field");
    tempCalc = [];

    const buttonArray = [{displayedText: "∞", buttonValue: ""},
                         {displayedText: "☺", buttonValue: ""},
                         {displayedText: "C", buttonValue: ""},
                         {displayedText: "←", buttonValue: ""},
                         {displayedText: "7", buttonValue: 7},
                         {displayedText: "8", buttonValue: 8},
                         {displayedText: "9", buttonValue: 9},
                         {displayedText: "÷", buttonValue: "/"},
                         {displayedText: "4", buttonValue: 4},
                         {displayedText: "5", buttonValue: 5},
                         {displayedText: "6", buttonValue: 6},
                         {displayedText: "*", buttonValue: "*"},
                         {displayedText: "1", buttonValue: 1},
                         {displayedText: "2", buttonValue: 2},
                         {displayedText: "3", buttonValue: 3},
                         {displayedText: "-", buttonValue: "-"},
                         {displayedText: "0", buttonValue: 0},
                         {displayedText: ".", buttonValue: "."},
                         {displayedText: "=", buttonValue: "="},
                         {displayedText: "+", buttonValue: "+"},];

for (let button of buttonArray){
  let newButton = document.createElement("button");
  newButton.id = "b" + button.displayedText;
  newButton.innerText = button.displayedText;
  newButton.dataset.digit = button.buttonValue;
  buttonField.appendChild(newButton);
};

let writeTopScreen = (keyPressed)=> {
  let inputText = document.createTextNode(keyPressed);
  topScreen.appendChild(inputText)
};

let enableInteraction = (e)=>{
  let keyPressed = e.target.innerText;
  writeTopScreen(keyPressed);
  tempCalc.push(keyPressed);
  console.log(tempCalc);
};

buttonField.addEventListener("click", enableInteraction);
