gsap.registerPlugin(ScrollTrigger);
Splitting();

/* 스무스 스크롤 */
const lenis = new Lenis()

lenis.on('scroll', (e) => {
  // console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)
lenis.stop();

/* 카운터 */

function startLoader() {
  let counterElement = document.querySelector('.counter')
  let currentValue = 0;
  
  function updateCounter() {
    if (currentValue === 100) {
      return;
    }
    currentValue += Math.floor(Math.random() *10) +1;
  
    if (currentValue > 100){
      currentValue = 100;
    }

    counterElement.textContent = currentValue;

    let delay = Math.floor(Math.random() * 200) + 50;

    setTimeout(updateCounter,delay)
  }

  updateCounter();

} //startLoader함수 끝
startLoader();

gsap.to('.counter', 0.25, {
  delay:3.5,
  opacity:0,
});

gsap.to('.bar', 1.5, {
  delay:3.5,
  height:0,
  stagger:{
    amount:0.5,
  },
  ease:"power4.inOut",
  onComplete: function() {
    // 애니메이션이 끝난 후에 수행할 작업을 여기에 추가합니다.
    // 예를 들어, visibility, display, opacity 등의 속성을 원래대로 변경합니다.
    $('.overlay').hide();
    $('.counter').hide();
    lenis.start();
  }
});

gsap.from('.sc-visual p', 1, {
  delay: 4.2,
  y:250,
  opacity:0,
  stagger:{
    amount: 0.5,
  },
  ease:"back.out"
});


/* 비주얼 텍스트 스플릿 */
const visualTl = gsap.timeline();
visualTl.from(".visual-text-box .char", 1, {
  delay:4.3,
  opacity: 0,
  yPercent: 130,
  stagger: 0.06,
  ease: "back.out",
  });


/* allAround 텍스트 */

const aroundTl = gsap.timeline();
aroundTl.to(".sc-allAround .t1", {xPercent: 70}, "text")
    .to(".sc-allAround .t2", {xPercent: -70}, "text")
    .to(".sc-allAround .t3", {xPercent: 70}, "text")
    .to(".sc-allAround .t4", {xPercent: -70}, "text")

ScrollTrigger.create({
    animation: aroundTl,
    trigger: ".sc-allAround h2",
    start: "top 35%",
    end: "bottom top",
    scrub: 1,
    ease: "none",
});

/* project 타이틀 애니메이션 */

gsap.utils.toArray('.section-title').forEach((title) => {
  gsap.set(title, { xPercent: 110, opacity: 0 });

  gsap.to(title, {
    xPercent: 0,
    stagger:5,
    scrollTrigger: {
      trigger: title,
      start: "top center",
      end: "top center",
      scrub: 1,
    },
    ease: "none",
    opacity: 1,
  });
});

/* project 콘텐츠 opacity */
gsap.set('[data-scroll-opacity]',{
  opacity:0,
  y:30,
})

ScrollTrigger.batch('[data-scroll-opacity]',{
  start:"top 80%",
  end:"top 80%",
  onEnter: batch =>{
    gsap.to(batch,{
      opacity:1,
      y:0
    })
  },
  onLeaveBack: batch => {
    gsap.to(batch,{
      opacity:0,
      y:30
    })
  },
})

/* project 텍스트 애니메이션*/

let arrow = ".text-grid-box .icon--arrow-up"

let tiTleArray = gsap.utils.toArray(".project-wrap .project .text-grid-group h3")

let subTitleArray = gsap.utils.toArray(".project-wrap .project .text-grid-group .text-desc")

let arrowArray = gsap.utils.toArray(".text-grid-box .icon--arrow-up")


tiTleArray.forEach((title) => {
  gsap.set(title, {
    opacity: 0,
    y: 20,
  });

  gsap.to(title, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: title.closest(".project"),
      start: "40% 60%",
      end: "40% 60%",
      toggleActions: "play none none reverse"
    }
  });
});

subTitleArray.forEach((subTitle)=>{
  gsap.set(subTitle, {
    opacity: 0,
    y: 20,
  });

  gsap.to(subTitle, {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: subTitle.closest(".project"),
      start: "50% 60%",
      end: "50% 60%",
      toggleActions: "play none none reverse"
    }
  });
})

arrowArray.forEach((arrow)=>{
  gsap.set(arrow,{
    opacity: 0,
    y: 20,
    rotation: 0
  })
  gsap.to(arrow,{
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: arrow.closest(".project"),
      start: "60% 60%",
      end: "60% 60%",
      toggleActions: "play none none reverse"
    }
  })
})


$(".project").on("mouseenter", function() {
  // 호버된 요소 내의 arrow 선택
  let arrow = $(this).find('.icon--arrow-up');
  gsap.to(arrow, {
    rotation: 45, // 호버 시 회전 각도
    duration: 0.1, // 회전 애니메이션 지속 시간
    ease: "power2.inOut"
  });
});

$(".project").on("mouseleave", function() {
  // 호버된 요소 내의 arrow 선택
  let arrow = $(this).find('.icon--arrow-up');
  gsap.to(arrow, {
    rotation: 0,
    duration: 0.1,
    ease: "power2.inOut"
  });
});


/* project 이미지 스케일 조정*/
gsap.utils.toArray('.sc-project .photo-box img').forEach((img)=>{
  gsap.set(img,{
    scale:1.2,
    yPercent:-5,
  }),
  gsap.to(img,{
    scrollTrigger:{
      trigger:img.closest(".sc-project .photo-box img"),
      start:"0% 100%",
      end:"100% 0%",
      scrub:true,
    },
    scale:1,
    yPercent:0,
  });
});

/* project rounded rotate 조정*/
ScrollTrigger.matchMedia({
  "(min-width:768px)":function(){
    gsap.to('.rounded-group .rounded-box', {
      rotate: "60deg",
      scrollTrigger: {
        trigger: ".rounded-group", // 스크롤 트리거를 설정할 요소
        start: "top center", // 트리거가 시작될 지점
        end: "bottom center", // 트리거가 끝날 지점
        scrub: 1, // 스크롤 시 애니메이션을 부드럽게 적용
      },
    });
  }
})


/* 가로스크롤 */

let sliderItem = $('.slider-item');
let sliderItemWidth = sliderItem.width();
console.log(sliderItemWidth); // 요소의 너비 출력

gsap.to(sliderItem,{
  // x: () => sliderItemWidth * -10,
  xPercent: -102 * (sliderItem.length - 1),
  ease:"none",
  scrollTrigger: {
    trigger:".sc-expertises",
    start:'top top',
    end: '+=1500',
    pin:".sc-expertises",
    scrub:true,
    invalidateOnRefresh: true
  }
});

/* together 이미지 스케일 조정 */
gsap.utils.toArray('.sc-together .together-img-box img').forEach((img)=>{
  gsap.set(img,{
    scale:1.2,
    yPercent:-5,
  }),
  gsap.to(img,{
    scrollTrigger:{
      trigger:img.closest(".sc-together .together-img-box img"),
      start:"0% 100%",
      end:"100% 0%",
      scrub:true,
    },
    scale:1,
    yPercent:0,
  });
});





/* 제이쿼리 */
$(function(){
  
  /* MY EXPERTISES 호라이즌 스크롤 */
  
  





}) // 제이쿼리 끝 지우면 안됨
