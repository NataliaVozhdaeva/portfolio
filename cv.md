## NATALIA VOZHDAEVA

**e-mail:** NataliaVVozhdaeva@gmail.com

HTML, CSS, and Javascript developer with experience in OOP including Single Page Application using the MVP. Have been
developing since 2020. Can make layout adaptive and cross-browser. Have a bit of experience with React and Angular, and continue my learning.  
A quick learner. Have high attention to details and accuracy of work. Adaptable, driven, and responsible.

### SKILLS

- HTML, CSS (Flex, Grid);
- Javascript;
- SCSS, PUG;
- Gulp, webpack;
- GIT, BEM;
- OOP;
- Figma, Photoshop;
- Git.

**Languages:**

- English (B1, in progress);
- Italian (A1);
- Russian (Native).

### CODE EXAMPLE

###### Task: adapt kebab- & snake_case to camelCase.

\*Preferred solution

```
function toCamelCase(str) {
      const arr = Array.from(str);
      let positions = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '-' || arr[i] === '_') {
          positions.push(i + 1);
        }
      }

      return arr
        .map((el, index) => {
          return positions.includes(index) ? el.toUpperCase() : el;
        })
        .filter((el) => {
          return el !== '-' && el !== '_';
        })
        .join('');
    }
```

Can solve it shorter, but believe, more readable is better

```
function toCamelCase(str){
  return str.split(/[-_]/).map(function (entry, index) {
    return index === 0 ? entry : entry.charAt(0).toUpperCase() + entry.slice(1)
  }).join('');
}
```

### EXPERIENCE IN DEVELOPMENT (education)

#### Course in Hotels.ru

- Created form for searching Github repositories by words in name:

  - used Github REST API;
  - dinamic creating elements for results;
  - noticing errors and message about it.

- Created form for comments, that lets:
  - click on heart-icon for add/remove like;
  - click on bit-icon for delete any comment;
  - enter your you own comment:
    - name into name-input;
    - text into text-area;
    - choose date or skip it (if you skip date will be written automatically);
    - submit onclick on the submit-batton or press "Enter";
    - use validation: name is required, text musn't be empty.
- Created 2 landings:
  - PixelPerfect, adaptive, liquid layout;
  - Custom input-range, redio-buttons, checkboxes;

#### RSSchool

- Created landing:
  - PixelPerfect, adaptive, liquid layout;
  - Custom select, accordion, and focus-changing depend on the user’s selection;
- Created SPA:
  - with actual time and date, weather widget for user’s city (async API), and quote of the Day (all of this in two languages depending
    on user’s choice)
  - with audio player;
  - with remote background collection (also async);
  - with module components (webpack);
- Solved different algorithm tasks (like binary searching, sorting, converting, etc).

#### HTML-academy

\*OOP, architecture patterns, class components, working with someone else's code.  
I developed [SPA](https://github.com/NataliaVozhdaeva/Cinemaddict). Realized:

- REST API;
- progressive loading;
- "shake effect" for interactive components when the server doesn't respond;
- adding and deleting comments;
- filter, sort, and user's rating;
- fixing the academy's code.

#### Rubius Academy

\*Gulp, webpack, React, CRUD operations. Async server's work (fetch).  
I created a [landing](https://determined-swanson-a44406.netlify.app/) for a Beauty salon (HTML, SCSS, JS, bootstrap). Realized:

- service's tabs switching (plugin, JS);
- modal window for order;
- photo's carousel (@fancybox, JS).

Also developed the [CRM for the salon](https://github.com/NataliaVozhdaeva/BeautyWorld/tree/crm1) with React. I created an order-form by myself. Realized:

- interaction with the server;
- choosing a service, date, and master;
- form for adding, deleting, and updating orders.

#### Tomsk State University of Control Systems and Radioelectronics

\*HTML5 and CSS3, javaScript, jQuery;

- implementation of complex visual effects: parallax, animations;
- getting experience in Canvas;
- creating by myself a landing for a store, using flexbox, transform, and javaScript.

**Pet-project** [Landing for Design Studio](https://nataliavozhdaeva.github.io/Design-Studio/)

Free figma layout, just with desctop version. Realized:

- desctop, adaptive and fluid layout. Used flex, grid, position.
- scroll animation;
- neverending slider (feedback);
- usual slider (examples);
- burger-menu for small screens.

### ABOUT ME

I have a degree in journalism, began to be interested in programming at school, but at that time we had programming lessons just in a graduate year, and that wasn’t enough to enter university. Studied myself and in 2020 understood that need a system education, and started courses.  
I take part in the game "What? Where? When?" (something like “Jeopardy”, but with the team), sort garbage, inspired by pixel-perfect which match from the first time, like knitting and cats.
