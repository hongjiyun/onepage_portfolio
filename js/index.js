$(document).ready(function () {
  $(".gnb>li>a").on("click", function (e) {
    console.log(this.hash);
    // let hash = this.hash;
    e.preventDefault();
    if (this.hash !== "") {
      let hash = this.hash;
      console.log(hash)
      // $(window).scrollTop();
      // $("#about").offset().top  = let topSec = $(hash).offset().top
      // console.log(offset)
      $("html,body").animate({
        scrollTop: $(hash).offset().top

      }, 800)
    }
  })


  $(window).resize(function () {
    resizeable()
  })

  function resizeable() {
    if ($(window).width() < 768) {
      console.log("모바일에서 실행될 스크립트")
    } else if ($(window).width() < 1200) {
      console.log("태블릿에서 실행될 스크립트")
    } else {
      console.log("데스크탑에서 실행될 스크립트")
    }
  }
  resizeable()



  // work
  const text = document.querySelector(".text");
  const work = document.querySelector("#work");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        text.classList.add("active");
      } else {
        text.classList.remove("active");
      }
    });
  }, { threshold: 0.2 });

  observer.observe(work);


  // 섹션 감지
  const skillSection = document.querySelector("#skill");
  const observer1 = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runSkillBars();       
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer1.observe(skillSection);






//Work 
window.onload = function() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close_btn");
  const images = document.querySelectorAll(".work_img img");

  let scale = 1;
  let isDragging = false;
  let startX, startY;
  let translateX = 0, translateY = 0;

  images.forEach(img => {
    img.onclick = function() {
      modal.style.display = "flex";
      modalImg.src = this.src;
      document.body.style.overflow = "hidden"; 
      resetImage();
    };
  });

  function resetImage() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    updateTransform();
  }

  function updateTransform() {
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  }

  
  modal.onwheel = function(e) {
    e.preventDefault();
    const delta = e.deltaY;
    if (delta > 0) {
      scale = Math.max(0.5, scale - 0.2);
    } else {
      scale = Math.min(8, scale + 0.2);
    }
    updateTransform();
  };

  
  modalImg.onmousedown = function(e) {
    if (scale <= 1) return; 
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    modalImg.style.transition = "none";
  };

  
  window.onmousemove = function(e) {
    if (!isDragging) return;
    translateX = e.clientX - startX;
    translateY = e.clientY - startY;
    updateTransform();
  };

  
  window.onmouseup = function() {
    isDragging = false;
    modalImg.style.transition = "transform 0.1s ease-out";
  };

  
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    resetImage();
  }

  closeBtn.onclick = closeModal;

};


  // 애니메이션을 적용
  const animatedElements = document.querySelectorAll('.about_left_box, .work_img');

  const observer2 = new IntersectionObserver((entries, observer2) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active'); // 화면에 보이면 활성화
        observer2.unobserve(entry.target); // 한 번만 실행
      }
    });
  }, {
    threshold: 0.2
  });

  // 각 요소 관찰 시작
  animatedElements.forEach(el => {
    observer2.observe(el);
  });

  // 각 이미지 박스 관찰 시작
  workImgs.forEach(img => {
    observer.observe(img);
  });



}) //jquery end