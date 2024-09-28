function matter(){
    var canvas = $('#wrapper-canvas').get(0);
  
  var dimensions = {
    width: $(window).width(),
    height: $(window).height(),
  };
  
  Matter.use('matter-attractors');
  Matter.use('matter-wrap');
  
  function runMatter() {
    var Engine = Matter.Engine,
      Events = Matter.Events,
      Runner = Matter.Runner,
      Render = Matter.Render,
      World = Matter.World,
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      Common = Matter.Common,
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      Bodies = Matter.Bodies;
  
    var engine = Engine.create();
  
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;
    engine.world.gravity.scale = 0.1;
  
    var render = Render.create({
      element: canvas,
      engine: engine,
      options: {
        showVelocity: false,
        width: dimensions.width,
        height: dimensions.height,
        wireframes: false,
        background: 'transparent',
      },
    });
  
    var runner = Runner.create();
  
    var world = engine.world;
    world.gravity.scale = 0;
  
    var attractiveBody = Bodies.circle(
      render.options.width / 2,
      render.options.height / 2,
      Math.max(dimensions.width / 25, dimensions.height / 25) / 2,
      {
        render: {
          fillStyle: `#000`,
          strokeStyle: `#000`,
          lineWidth: 0,
        },
  
        isStatic: true,
        plugin: {
          attractors: [
            function (bodyA, bodyB) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
              };
            },
          ],
        },
      }
    );
  
    World.add(world, attractiveBody);
  
    for (var i = 0; i < 60; i += 1) {
      let x = Common.random(0, render.options.width);
      let y = Common.random(0, render.options.height);
      let s = Common.random() > 0.6 ? Common.random(10, 80) : Common.random(4, 60);
      let poligonNumber = Common.random(3, 6);
      var body = Bodies.polygon(
        x,
        y,
        poligonNumber,
        s,
  
        {
          mass: s / 20,
          friction: 0,
          frictionAir: 0.02,
          angle: Math.round(Math.random() * 360),
          render: {
            fillStyle: '#222222',
            strokeStyle: `#000000`,
            lineWidth: 2,
          },
        }
      );
  
      World.add(world, body);
  
      let r = Common.random(0, 1);
      var circle = Bodies.circle(x, y, Common.random(2, 8), {
        mass: 0.1,
        friction: 0,
        frictionAir: 0.01,
        render: {
          fillStyle: r > 0.3 ? `#27292d` : `#444444`,
          strokeStyle: `#000000`,
          lineWidth: 2,
        },
      });
  
      World.add(world, circle);
  
      var circle = Bodies.circle(x, y, Common.random(2, 20), {
        mass: 6,
        friction: 0,
        frictionAir: 0,
        render: {
          fillStyle: r > 0.3 ? `#334443` : `#222222`,
          strokeStyle: `#111111`,
          lineWidth: 4,
        },
      });
  
      World.add(world, circle);
  
      var circle = Bodies.circle(x, y, Common.random(2, 30), {
        mass: 0.2,
        friction: 0.6,
        frictionAir: 0.8,
        render: {
          fillStyle: `#191919`,
          strokeStyle: `#111111`,
          lineWidth: 3,
        },
      });
  
      World.add(world, circle);
    }
  
    var mouse = Mouse.create(render.canvas);
  
    Events.on(engine, 'afterUpdate', function () {
      if (!mouse.position.x) return;
      Body.translate(attractiveBody, {
        x: (mouse.position.x - attractiveBody.position.x) * 0.12,
        y: (mouse.position.y - attractiveBody.position.y) * 0.12,
      });
    });
  
    // Create bodies on click
    // Matter.Events.on(mouse, "mousedown", function(event) {
    //   let x = event.mouse.position.x;
    //   let y = event.mouse.position.y;
    //   var body = Bodies.circle(x, y, Common.random(10, 30), {
    //     mass: 0.5,
    //     friction: 0,
    //     frictionAir: 0.05,
    //     render: {
    //       fillStyle: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    //       strokeStyle: `#000000`,
    //       lineWidth: 1,
    //     },
    //   });
    //   World.add(world, body);
    // });
  
    // Keyboard controls
    // document.addEventListener("keydown", function(event) {
    //   if (event.key === "g") {
    //     world.gravity.y = world.gravity.y === 0 ? 1 : 0;
    //   }
    // });
  
    // Change color based on speed
    Events.on(engine, 'afterUpdate', function() {
      Composite.allBodies(engine.world).forEach(function(body) {
        if (body.speed > 6) {
          body.render.fillStyle = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        }
      });
    });
  
  
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);
  
    return {
      engine: engine,
      runner: runner,
      render: render,
      canvas: render.canvas,
      stop: function () {
        Matter.Render.stop(render);
        Matter.Runner.stop(runner);
      },
      play: function () {
        Matter.Runner.run(runner, engine);
        Matter.Render.run(render);
      },
    };
  }
  
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
  
  function setWindowSize() {
    let dimensions = {};
    dimensions.width = $(window).width();
    dimensions.height = $(window).height();
  
    m.render.canvas.width = $(window).width();
    m.render.canvas.height = $(window).height();
    return dimensions;
  }
  
  let m = runMatter();
  setWindowSize();
  $(window).resize(debounce(setWindowSize, 250));
  
  }
  matter();
  
  
  // js
  
  const aboutSection = document.querySelector('.about-section')
  const aboutMeBtn = document.querySelector('.about-me-btn')
  const xIcon = document.querySelector('.x-icon')
  const navbar = document.querySelector('.navbar')
  const socialIcons = document.querySelector('.social-links')
  const overlay = document.querySelector('.overlay')
  const bodyContainer = document.querySelector('#body-container')
  const latestWorkBtn = document.querySelector('.latest-works-link')
  
  
  
  aboutMeBtn.addEventListener('click', () => {
    aboutSection.classList.add('active')
    overlay.classList.add('active')
    navbar.classList.add('hidden')
    navbar.classList.add('hidden')
    socialIcons.classList.add('hidden')
  })
  
  xIcon.addEventListener('click', () => {
    aboutSection.classList.remove('active')
    overlay.classList.remove('active')
    navbar.classList.remove('hidden')
    socialIcons.classList.remove('hidden')
    enableScroll()
  })
  
  overlay.addEventListener('click', () => {
    aboutSection.classList.remove('active')
    overlay.classList.remove('active')
    navbar.classList.remove('hidden')
    socialIcons.classList.remove('hidden')
    enableScroll()
  })
  // latestWorks.addEventListener('click', (e) => {
  //   scrollTo(0, mainSection.clientHeight)
  // })
  const latestWorks = document.getElementById('latestwork'); // Your clickable element
const scrollAmount = window.innerHeight * 0.5; // 10% of the viewport height

latestWorks.addEventListener('click', (e) => {
    window.scrollBy({
        top: scrollAmount,
        behavior: 'smooth' // Smooth scrolling effect
    });
});
  
  
function slider(){
  const slides = document.querySelectorAll('.slide');
let count = 0;

// Update slideImage function to shift the images correctly
const slideImage = () => {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(-${count * 110}%)`;
    });
};

// Navigation buttons
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

prevBtn.addEventListener('click', () => {
    if (count > 0) {
        count--;
        slideImage();
    }
});

nextBtn.addEventListener('click', () => {
    if (count < slides.length - 1) {
        count++;
        slideImage();
    }
});

// Initialize position of slides
slideImage();
}

slider();