const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// header
const navbarTopItems = $$('.navbar-top-item')
const navbarBotItems = $$('.navbar-bot__item-link')
const root = $(':root')
const slider = $('.slider')
const header = $('.header')
const navbarTop = $('.navbar-top')
const navbarBottom = $('.navbar-bot')

//handle sidebar
const navListBtn = $('.navbar-center__list-toggle')
const sideBarModal = $('.sidebar__modal-menu')
const sideBarInner = $('.sidebar__menu-inner')

const sideBarInput = $('.sidebar__search-input')
const sideBarSearch = $('.sidebar__search')

//handle search computer
const headerSearchBtnToggle = $('.header__search-toggle')
const headerSearchModal = $('.header__search-modal')

//handle form
const formSwitchBtn = $$('.form-switch')
const formLogin = $('.form__login')
const formRegister = $('.form__register')

const formModal = $('.form__modal')
const loginBtn = $$('.login-btn')
const registerBtn = $$('.register-btn')
const closeFormBtn = $$('.form__btn-close')

const selectionEle = $('.select-players--effect')
const selectionNotEffect = $('.select-players--not-effect')
const selectReal = $('.select-players__label')

const btnShowPlayers = $('.btn__show-players')
const btnShowStaffs = $('.btn__show-staffs')
const homePlayersList = $$('.home-players__list')
app = {
    showAllPlayers: function(){
        homePlayersList.forEach(item => {
            item.classList.remove('hide')
        })
        homePlayersList[4].classList.add('hide')
        selectReal.selectedIndex = 0
    },

    showStaffs: function(){
        homePlayersList.forEach(item => {
            item.classList.add('hide')
        })
        homePlayersList[4].classList.remove('hide')
    },

    showPlayersById: function(id){
        let playerShow = $(`#${id}`)
        homePlayersList.forEach(item => {
            item.classList.add('hide')
        })
        playerShow.classList.remove('hide')
    },

    setupSelector: function(selector){
        selector.addEventListener('mousedown', e => {
            e.preventDefault();
    
            const select = selector.children[0];
            const dropDown = document.createElement('ul');
            dropDown.className = "selector-options";
    
            [...select.children].forEach(option => {
                const dropDownOption = document.createElement('li');
                dropDownOption.textContent = option.textContent;
        
                dropDownOption.addEventListener('mousedown', (e) => {
                    e.stopPropagation();
                    select.value = option.value;
                    selector.value = option.value;
                    select.dispatchEvent(new Event('change'));
                    selector.dispatchEvent(new Event('change'));
                    dropDown.remove();
                });
    
                dropDown.appendChild(dropDownOption);
                    
            });
        
            selector.appendChild(dropDown);
    
            // handle click out
            document.addEventListener('click', (e) => {
                if(!selector.contains(e.target)) {
                    dropDown.remove();
                }
            });
        });
    },

    showLoginForm: function(){
        formModal.classList.remove('hide')
        $('.form__account.show').classList.remove('show')
        formLogin.classList.add('show')
    },

    showRegisterForm: function(){
        formModal.classList.remove('hide')
        $('.form__account.show').classList.remove('show')
        formRegister.classList.add('show')
    },

    hideModalForm: function(){
        formModal.classList.add('hide')
    },

    handleAllClearError: function(){
        var formGroups = $$('.form-group')
        var formMsgs = $$('.form-message')
        var formControls = $$('.form-control')

        formGroups.forEach((formGroup, index) => {
            formControls[index].value = ''
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid')
                formMsgs[index].innerText = ''
            }
        })
    },

    handleEvent: function(){
        const _this = this
        //navbar top items
        navbarTopItems.forEach((item) => {
            item.onclick = function(){
                let navbarTopItemClicked = $('.navbar-top-item.navbar-top-item--clicked')
                navbarTopItemClicked.classList.remove('navbar-top-item--clicked')
                item.classList.add('navbar-top-item--clicked')
            }
        })

        //navbar bot item
        navbarBotItems.forEach(item => {
            item.onclick = function(){
                let navbarBotItemClicked = $('.navbar-bot__item-link.navbar-bot__item-link--click')
                navbarBotItemClicked.classList.remove('navbar-bot__item-link--click')
                item.classList.add('navbar-bot__item-link--click')
            }
        })

        //handle scroll hide header
        let heightSlider = slider.offsetHeight / 2
        let lastScrollTop = heightSlider
        function scrollHideHeader(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop //two the same
            if(scrollTop > heightSlider){
                header.style.transition =  '0.3s ease-in-out'
                if(scrollTop > lastScrollTop){
                    header.style.top = `-${header.offsetHeight}px`
                }else{
                    header.style.top = '0'
                    navbarTop.classList.add('hide')
                    navbarBottom.classList.add('hide')
                    root.style.setProperty('--header-height', '80px')
                }
                lastScrollTop = scrollTop
            }else{
                header.style.transition =  'none'
                navbarTop.classList.remove('hide')
                navbarBottom.classList.remove('hide')
                root.style.setProperty('--header-height', '178px')
            }
        }

        //event hide header when scroll
        window.addEventListener('scroll', scrollHideHeader)

        //function toggle sidebar
        function toggleSlideBar(){
            navListBtn.classList.toggle('active')
            sideBarModal.classList.toggle('hide')
            if(sideBarModal.className.match('hide')){
                window.addEventListener('scroll', scrollHideHeader)
            }else{
                window.removeEventListener('scroll', scrollHideHeader)
            }
        }

        navListBtn.addEventListener('click', toggleSlideBar)
        sideBarModal.addEventListener('click', function(e){
            if(e.target == e.currentTarget){
                toggleSlideBar()
            }
        })

        //sidebar input focus
        sideBarInput.onfocus = function(){
            sideBarSearch.classList.add('active')
        }

        sideBarInput.onblur = function(){
            sideBarSearch.classList.remove('active')
        }

        //header toggle show header__search
        function toggleHeaderSearch(){
            headerSearchBtnToggle.classList.toggle('show')
            headerSearchModal.classList.toggle('hide')
            if(headerSearchModal.className.match('hide')){
                window.addEventListener('scroll', scrollHideHeader)
            }else{
                window.removeEventListener('scroll', scrollHideHeader)
            }
        }

        headerSearchBtnToggle.addEventListener('click', toggleHeaderSearch)
        headerSearchModal.addEventListener('click', function(e){
            if(e.target == e.currentTarget){
                toggleHeaderSearch()
            }
        })

        //switch form
        formSwitchBtn.forEach((item)=>{
            item.onclick = function(){
                formLogin.classList.toggle('show')
                formRegister.classList.toggle('show')
                _this.handleAllClearError()
            }
        })

        loginBtn.forEach((item)=>{
            item.addEventListener('click', function(){
                _this.showLoginForm()
                _this.handleAllClearError()
            })
        })
        registerBtn.forEach((item)=>{
            item.addEventListener('click', function(){
                _this.showRegisterForm()
                _this.handleAllClearError()
            })
        })
        //
        closeFormBtn.forEach(item => {
            item.addEventListener('click', _this.hideModalForm)
        });

        formModal.addEventListener('click', function(e){
            if(e.target == e.currentTarget){
                _this.hideModalForm()
            }
        })
        //show player and staff
        btnShowPlayers.addEventListener('click', function(){
            btnShowPlayers.classList.add('home-filter__btn-clicked')
            btnShowStaffs.classList.remove('home-filter__btn-clicked')
            selectionEle.classList.remove('hide')
            selectionNotEffect.classList.add('hide')
            _this.showAllPlayers()
        })

        btnShowStaffs.addEventListener('click', function(){
            btnShowPlayers.classList.remove('home-filter__btn-clicked')
            btnShowStaffs.classList.add('home-filter__btn-clicked')
            selectionEle.classList.add('hide')
            selectionNotEffect.classList.remove('hide')
            _this.showStaffs()
        })

        selectionEle.addEventListener('change', e => {
            console.log('changed', e.target.value)
            if(e.target.value == 'PLAYERS'){
                _this.showAllPlayers()
            }else{
                _this.showPlayersById(e.target.value)
            }
        })
    },

    start: function(){
        this.setupSelector(selectionEle)
        this.handleEvent()
    }
}

app.start()