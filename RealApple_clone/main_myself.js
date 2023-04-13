(() => {

    ////// 필요한 전역변수 생성하기 ///////////////////////////////////////////////////////////////////////////

    // Scroll-Y 값
    let yOffset = 0;

    // 현재 섹션
    let currentSection = 0;




    ////// 함수 생성하기 //////////////////////////////////////////////////////////////////////////////////////

    ////// 섹션의 정보를 배열 속 오브젝트에 생성 -----------------------------------------------
    const sectionSet = [
        // section-0
        {
            height: 0,
            hMultiple : 5,
            objs : {container : document.querySelector("#section-0")}

        },

        // section-1
        {
            height: 0,
            hMultiple : 3,
            objs : {container : document.querySelector("#section-1")}

        }
    ];


    ////// 각 섹션의 높이를 정하는 함수 생성 -----------------------------------------------------
    const setLayout = function() {

        let height = 0;

        if (window.innerHeight < 500) {

            height = 500;

        } else {

            height = window.innerHeight;

        }

        for (let i = 0; i < sectionSet.length; i++) {

            sectionSet[i].height = height * sectionSet[i].hMultiple;
            sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;

        }

    };



    /////// 스크롤된 시점의 섹션명을 도출하는 함수 생성 -------------------------------------------------
    const getCurrentSection = function() {

        let segment = [

            sectionSet[0].height,
            sectionSet[0].height + sectionSet[1].height

        ];

        if (yOffset <= segment[0]) {

            section = 0;

        } else if ((yOffset > segment[0]) && (yOffset <= segment[1])) {

            section = 1;

        } else {

            // 그럴 일은 없다.
            console.error("[ERROR] getCurrentSection()");

        }

    };


    /////// EVENT LISTENER ////////////////////////////////////////////////////////////////////////////////////
    
    ////// 스크롤 될 때마다 값을 도출하는 이벤트

    window.addEventListener('scroll', () => {

        yOffset = window.scrollY;
        currentSection = getCurrentSection();

    });






})();