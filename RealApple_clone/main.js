(() => {

    const sectionSet = [
        // section-0의 정보
        {
            height : 0,
            hMultiple : 5,

            objs : {
                container : document.querySelector("#section-0"),
            }
        },

        // section-1의 정보
        {
            height : 0,
            hMultiple : 4,

            objs : {
                container : document.querySelector("#section-1"),
            }
        }
    ];

    const setLayout = function() {

        // section-0의 레이아웃을 설정한다.
        sectionSet[0].height = window.innerHeight * sectionSet[0].hMultiple;
        sectionSet[0].objs.container.style.height = `${sectionSet[0].height}px`;

        // section-1의 레이아웃을 설정한다.
        sectionSet[1].height = window.innerHeight * sectionSet[1].hMultiple;
        sectionSet[1].objs.container.style.height = `${sectionSet[1].height}px`;
    }

    setLayout();
    


})();