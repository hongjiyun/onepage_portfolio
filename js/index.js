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





  // 원 마우스포인터
  document.body.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty("--x", x + "%");
    document.body.style.setProperty("--y", y + "%");
  });

  // 배경
  const positions = [
    { x: 20, y: 30, dx: 0.1, dy: 0.07, color: 'rgba(233, 182, 255, 0.6)' },
    { x: 80, y: 70, dx: 0.07, dy: 0.1, color: 'rgba(138, 205, 250, 0.6)' },
    { x: 30, y: 40, dx: 0.03, dy: 0.05, color: 'rgba(116, 171, 255, 0.6)' },
    { x: 50, y: 50, dx: 0.05, dy: 0.06, color: 'rgba(255, 194, 252, 0.6)' }
  ];

  function updateBackground() {
    positions.forEach(pos => {
      pos.x += pos.dx;
      pos.y += pos.dy;

      // 경계 반전
      if (pos.x > 80 || pos.x < 20) pos.dx = -pos.dx;
      if (pos.y > 80 || pos.y < 20) pos.dy = -pos.dy;
    });

    const bg = positions.map(pos =>
      `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${pos.color}, transparent 70%)`
    ).join(',');

    // body와 #project 둘 다 배경 적용
    // const project = document.getElementById("project");

    document.body.style.background = bg;
    document.body.style.backgroundBlendMode = "screen";

    // if (project) {
    //   project.style.background = bg;
    //   project.style.backgroundBlendMode = "screen";
    // }

    requestAnimationFrame(updateBackground);
  }

  updateBackground();





  // intro > about
  const intro = document.getElementById('intro');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const introHeight = intro.offsetHeight;

    if (scrollY > introHeight * 0.5) {
      intro.style.backgroundColor = 'white';  // 배경을 흰색으로 덮음
    } else {
      intro.style.backgroundColor = 'transparent';  // 원래 상태로
    }
  });




  //about
  function initInkEffect(sectionId) {
    const section = document.getElementById(sectionId);

    // 캔버스 생성 및 삽입
    const canvas = document.createElement('canvas');
    section.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    function resize() {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = section.clientWidth * ratio;
      canvas.height = section.clientHeight * ratio;
      canvas.style.width = section.clientWidth + 'px';
      canvas.style.height = section.clientHeight + 'px';
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    window.addEventListener('resize', resize);
    resize();

    class InkCircle {
      constructor(x, y, maxRadius, color, growSpeed, fadeSpeed) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = maxRadius;
        this.color = color;
        this.growSpeed = growSpeed;
        this.fadeSpeed = fadeSpeed;
        this.opacity = 0.5;
      }

      update() {
        if (this.radius < this.maxRadius) this.radius += this.growSpeed;
        if (this.opacity > 0) this.opacity -= this.fadeSpeed;
      }

      draw(ctx) {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, this.radius * 0.1,
          this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      isDone() {
        return this.opacity <= 0;
      }
    }

    const colors = [
      { r: 210, g: 190, b: 230 },
      { r: 190, g: 220, b: 240 },
      { r: 150, g: 180, b: 230 },
      { r: 230, g: 150, b: 220 }
    ];

    let inkCircles = [];
    let overlayOpacity = 0;

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    function createInkCircles() {
      const count = Math.floor(random(1, 4));
      for (let i = 0; i < count; i++) {
        const x = random(0, canvas.width);
        const y = random(0, canvas.height);
        const maxRadius = random(2000, 4000);
        const color = colors[Math.floor(random(0, colors.length))];
        const growSpeed = random(1.0, 2.0);
        const fadeSpeed = random(0.001, 0.0025);

        inkCircles.push(new InkCircle(x, y, maxRadius, color, growSpeed, fadeSpeed));
      }
    }

    setInterval(createInkCircles, 1200);

    function animate() {
      if (overlayOpacity > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${overlayOpacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        overlayOpacity -= 0.02;
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      ctx.globalCompositeOperation = 'multiply';

      for (let i = inkCircles.length - 1; i >= 0; i--) {
        const ink = inkCircles[i];
        ink.update();
        ink.draw(ctx);
        if (ink.isDone()) inkCircles.splice(i, 1);
      }

      ctx.globalCompositeOperation = 'source-over';
      requestAnimationFrame(animate);
    }

    animate();

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        inkCircles = [];
        overlayOpacity = 1;
      }
    });
  }

  // 여러 섹션에 적용
  initInkEffect("about");
  initInkEffect("work");


  //텍스트고정 work
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


  // 퍼센트
  // 스킬 애니메이션 함수로 묶기
  function runSkillBars() {
    $(".skill_bg").each(function (i) {
      let skill = $(this).find(".skill_bar");
      let num = 0;
      let percent = parseInt(skill.text());
      console.log(percent);

      skill.delay(i * 500).animate({
        width: percent + "%"
      }, function () {
        let increase = setInterval(function () {
          num++;
          if (num > percent) {
            clearInterval(increase);
          } else {
            skill.text(num + "%");
          }
        }, 10);
      });
    });
  }

  // IntersectionObserver로 섹션 감지
  const skillSection = document.querySelector("#skill");
  const observer1 = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runSkillBars();       // 섹션이 화면에 보이면 애니메이션 실행
        obs.unobserve(entry.target); // 한 번만 실행
      }
    });
  }, { threshold: 0.5 });

  observer1.observe(skillSection);



  //프로젝트
  let projectData = [
    {
      img: "./img/zerowaste.png",
      text: `
      <div>
        <p>개인 프로젝트로서 <br>제로웨이스트 사이트 제작</p>
        1. 벤치마킹 사이트를 분석<br>
        2. 피그마로 레이아웃 제작<br>
        3. html과 css를 사용하여 <br>
        제로웨이스트 사이트 구현 <br>
      </div>
    `,
      link: "https://hongjiyun.github.io/zerowaste/",
      linkText: "Zerowaste site"
    },
    {
      img: "./img/valorant.png",
      text: `
      <div>
        <p 팀 프로젝트로서 <br>발로란트 사이트 리뉴얼</p>
        1. 리뉴얼 할 사이트를 분석<br>
        (사이트의 보안, 개선점 추가)<br>
        2. 피그마로 레이아웃 제작<br>
        (팀원들과 공통 색상,아이콘 협의)<br>
        3. html과 css를 사용하여 <br>
        발로란트 사이트 구현 <br>
        -e sport, 공지사항 페이지 제작<br>
      </div>
    `,
      link: "https://hongjiyun.github.io/teamproject_valorant_hjy/",
      linkText: "Valorant site"
    },
    {
      img: "./img/leeum.png",
      text: `
      <div>
           <p 팀 프로젝트로서 <br>리움미술관 사이트 리뉴얼</p>
        1. 리뉴얼 할 사이트를 분석<br>
        (사이트의 보안, 개선점 추가)<br>
        2. 피그마로 레이아웃 제작<br>
        (팀원들과 공통 색상,아이콘 협의)<br>
        3. html과 css를 사용하여 <br>
        리움 미술관 사이트 구현 <br>
       -아카이브, 공지사항 페이지 제작<br>
      </div>
    `,
      link: "https://hongjiyun.github.io/leeum_hjy/",
      linkText: "Leeum museum site"
    },
    {
      img: "./img/lotteword.png",
      text: `
      <div>
        <p>개인프로젝트로서 <br>민속박물관 사이트를 제작</p>
        1. 한화리츠 사이트를 참고<br>
        2. 한화리츠 레이아웃 참고<br>
        3. html과 css를 사용하여 <br>
        한화리츠 사이트 구현 <br>
        4.민속박물관 내용으로 재구현
      </div>
    `,
      link: "https://hongjiyun.github.io/hanwhareit_museum_renewale/",
      linkText: "Lotteworld folk museum site"
    }
  ];

  $(".project_left .pro_name").on("mouseenter", function () {
    let num = $(this).index();  // 몇 번째 li인지 확인
    let data = projectData[num];

    // 이미지 변경
    $(".project_right_big_img img").attr("src", data.img);

    // 텍스트 변경
    $(".project_right_text").html(data.text);

    // 링크 변경
    $(".link_adress a").attr("href", data.link).text(data.linkText);
  });




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