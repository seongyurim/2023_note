(() => {

    ////// 필요한 전역변수 생성하기 ///////////////////////////////////////////////////////////////////////////

    // Scroll-Y 값
    let yOffset = 0;

    // 현재 섹션
    let currentSection = 0;

    // yOffset의 스크롤값을 섹션별로 초기화
    let sectionYOffset = 0;




    ////// 함수 생성하기 //////////////////////////////////////////////////////////////////////////////////////

    ////// 섹션의 정보를 배열 속 오브젝트에 생성 -----------------------------------------------
    const sectionSet = [
        // section-0의 정보
        {
            height : 0,
            hMultiple : 5,
            objs : {container : document.querySelector("#section-0"),
                    messageA : document.querySelector(".section0-message.a"), //클래스를 두개 가져올 때(붙여서 가져옴)
                    messageB : document.querySelector(".section0-message.b"),
                    messageC : document.querySelector(".section0-message.c"),
                    messageD : document.querySelector(".section0-message.d"),
            },   

            vals : {    
                messageA_fade_in :  [0, 1, {start: 0.03, end: 0.12}], 
                messageA_fade_out : [1, 0, {start: 0.13, end: 0.23}],
    
            },
        },


        // section-1의 정보
        {
            height : 0,
            hMultiple : 4,
            objs : {container : document.querySelector("#section-1")}
        }
    ];


    ////// 각 섹션의 높이를 정하는 함수 ---------------------------------------------------------
    const setLayout = function() {

        let height = 0;
        
        // 높이가 500px보다 작은 경우는 강제로 500으로 설정한다.
        if (window.innerHeight < 500) {
            
            height = 500;
            
        } else {
            
            height = window.innerHeight;            
            
        }
        
        // 각 섹션의 높이를 설정한다.
        for (let i = 0; i < sectionSet.length; i++) {

            sectionSet[i].height = height * sectionSet[i].hMultiple;
            sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;
            
        }
    }    
    // 지금 이 위치에서 이 함수가 일회성으로 setLayout(); 호출되면 생기는 문제?
    // 특정 사이즈로 보다가 사용자가 브라우저 크기를 변경했을 경우
    // 그 바뀐 사이즈로 바로 바뀌지 않고, 새로고침을 해야만 변경된다.
    // 따라서 크기가 변경될 때마다 함수가 호출되어야 하겠다.


    /////// 스크롤된 시점의 섹션명을 도출하는 함수 -----------------------------------------------------
    const getCurrentSection = function(){

        let segment = [
            sectionSet[0].height,
            sectionSet[0].height + sectionSet[1].height
        ];
        // 지금은 섹션이 2개라서 특정 스크롤 숫자를 넘냐/안넘냐의 차이라 배열이 굳이 필요 없지만
        // 섹션이 4개라면 특정 스크롤 숫자가 3개가 필요하기 때문에 이럴 때에는 배열을 사용하는 것이 좋다.

        let section = 0;
        if (yOffset <= segment[0]) {

            section = 0;

        } else if ((yOffset > segment[0]) && (yOffset <= segment[1])) {

            section = 1;

        } else {

            // 올 일이 없다.
            console.error("[ERROR] getCurrentSection()");
        }

        return section;

    }


    ////// body ID를 section0에서 section1로 변경하는 함수 ---------------------------------------------------------
    ////// sticky-element를 보이게-안보이게 전환시키기 위해
    const setBodyID = function(section) {

        document.body.setAttribute("id", `show-section${section}`);

    }



    ////// local-nav를 특정 시점부터 고정시키는 함수 ---------------------------------------------------------------
    const setLocalnavMenu = function() {

        if (yOffset > 44) {

            // local-nav를 fixed.
            document.body.classList.add('local-nav-sticky');

        } else {

            // local-nav를 원래 상태로.
            document.body.classList.remove('local-nav-sticky');

        }

    }



    ////// 이전 섹션의 높이를 구하는 함수 -------------------------------------------------------------------------
    const getPrevSectionHeight = function() {

        let prevHeight = 0;

        for (let i = 0; i < currentSection; i++) {

            prevHeight = prevHeight + sectionSet[i].height;

        }
        
        return prevHeight;

    }
    


    ////// 섹션별로 애니메이션을 실행하는 함수 -------------------------------------------------------------------
    const playAnimation = function() {

        let scrollRate = sectionYOffset / sectionSet[currentSection].height; // 0~1 사이의 값이 나온다.

        switch(currentSection) {

            case 0:

                if (scrollRate <= 0.25) {

                    

                }

                console.log("0번 섹션의 애니메이션이 돌고 있어요.");
                break;

            case 1:
                console.log("1번 섹션의 애니메이션이 돌고 있어요.");
                break;

            default:
                console.error("[ERROR] playAnimation()");
                break;

        }

    }




    /////// EVENT LISTENER ////////////////////////////////////////////////////////////////////////////////////




    window.addEventListener('scroll', () => {

        // 1. 스크롤 값을 설정한다.
        yOffset = window.scrollY;

        // 2. 현재 섹션값을 가지고 온다.
        currentSection = getCurrentSection();

        // 섹션별 스크롤값을 초기화해보자.
        sectionYOffset = yOffset - getPrevSectionHeight();
        // console.log("sectionYOffset = " + sectionYOffset);

        // CSS 변경..
        setBodyID(currentSection);
        setLocalnavMenu();
        // console.log(`yOffset = ${yOffset}, section = ${currentSection}`);

        // 
        playAnimation();

    });
    

    // setLayout() 호출을 위해서는 두가지 이벤트를 추가해야 한다.
    // 1. 처음 로딩될 때 setLayout()를 호출해준다.
    window.addEventListener('load', () => {
        // 1) 레이아웃을 다시 잡는다.
        setLayout();

        // 2) 스크롤 값을 다시 설정한다.
        yOffset = window.scrollY;

        // 3) 현재 섹션값을 가지고 온다.
        currentSection = getCurrentSection();
        setBodyID(currentSection);
        setLocalnavMenu();
    });

    // 2. 사이즈가 변경되면 setLayout() 다시 호출해준다.
    window.addEventListener('resize', () => {
        setLayout();
    });



})();