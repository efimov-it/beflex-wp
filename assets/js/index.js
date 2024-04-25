document.addEventListener("DOMContentLoaded", () => {

    // Helpers

    function phoneFormat(phone) {
        phone = phone.replace(/\D/g, ''); // Удаляем все нецифровые символы из номера
        phone = phone.replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5'); // Применяем форматирование
        return phone;
    }


    // Main menu code

    const headerMenuBtn = document.querySelector("#mainMenuBtn");
    const mainMenuBackground = document.querySelector("#mainMenuBackground");
    const mainMenu = document.querySelector("#mainMenu");
    const closeMenuBtn = document.querySelector("#closeMainMenuBtn");
    const backMenuBtn = document.querySelector("#backMainMenuBtn");

    const resetMobileMenu = () => {
        firstLevelMenu.classList.remove("bf-headerNavList__hidden");

        document.querySelectorAll(".bf-headerNavList2").forEach(elem => {
            elem.classList.remove("bf-headerNavList2__active")
        });
    }

    headerMenuBtn.onclick = () => {
        mainMenuBackground.style.display = null;

        setTimeout(() => {
            mainMenuBackground.classList.remove("bf-headerNavBackground__hidden");
            mainMenu.classList.remove("bf-headerNav__hidden");
        }, 10);
    }

    const closeMenu = () => {
        mainMenuBackground.classList.add("bf-headerNavBackground__hidden");
        mainMenu.classList.add("bf-headerNav__hidden");

        setTimeout(() => {
            mainMenuBackground.style.display = "none";
            resetMobileMenu();
        }, 400);
    }

    closeMenuBtn.onclick = closeMenu;
    mainMenuBackground.onclick = closeMenu;

    backMenuBtn.onclick = resetMobileMenu;

    // Mobile main menu code

    const firstLevelMenu = document.querySelector(".bf-headerNavList");
    const firstLevelLinks = document.querySelectorAll(".bf-headerNavList_itemLink");

    firstLevelLinks.forEach(firstLevelLink => {
        if (firstLevelLink.tagName === "SPAN") {
            firstLevelLink.onclick = () => {
                if (firstLevelLink.dataset.submenu) {
                    firstLevelMenu.classList.add("bf-headerNavList__hidden");
                    const secondLevelMenu = document.querySelector("#" + firstLevelLink.dataset.submenu);
                    secondLevelMenu.classList.add("bf-headerNavList2__active");
                }
            }
        }
    });


    // Classes sliders

    document.querySelectorAll('.bf-classesSlider_button')
        .forEach(classesSliderButton => {
            classesSliderButton.onclick = () => {

                const dots = classesSliderButton.parentElement.querySelectorAll('.bf-classesSliderDot');

                const event = classesSliderButton.dataset.event;

                const slides = classesSliderButton.parentElement.querySelectorAll(".bf-classesSlide");
                const slidesCount = slides.length;

                let currentSlideIndex = 0;

                slides.forEach((slide, i) => {
                    if (slide.classList.contains('bf-classesSlide__active')) {
                        currentSlideIndex = i;
                    }
                });

                const currentSlide = slides[currentSlideIndex];
                const currentDot = dots[currentSlideIndex * 6];
                let nextSlide = null;
                let nextDot = null;

                if (event === 'next') {
                    if (currentSlideIndex < slidesCount - 1) {
                        nextSlide = slides[currentSlideIndex + 1];
                        nextDot = dots[(currentSlideIndex + 1) * 6];
                    } else {
                        nextSlide = slides[0];
                        nextDot = dots[0];
                    }
                } else {
                    if (currentSlideIndex > 0) {
                        nextSlide = slides[currentSlideIndex - 1];
                        nextDot = dots[(currentSlideIndex - 1) * 6];
                    } else {
                        nextSlide = slides[slidesCount - 1];
                        nextDot = dots[(slidesCount - 1) * 6];
                    }
                }

                if (nextSlide && nextDot) {
                    nextSlide.style.display = null;
                    setTimeout(() => {
                        nextSlide.classList.add('bf-classesSlide__active');
                        currentSlide.classList.remove('bf-classesSlide__active');

                        nextDot.classList.add('bf-classesSliderDot__active');
                        currentDot.classList.remove('bf-classesSliderDot__active');

                        setTimeout(() => {
                            currentSlide.style.display = null;
                        }, 400);
                    }, 50);
                }
            }
        });

    document.querySelectorAll('.bf-classesSlider_track')
        .forEach(classesSliderTrack => {
            classesSliderTrack.onscroll = (e) => {
                const scrollLeft = classesSliderTrack.scrollLeft;

                const slides = classesSliderTrack.querySelectorAll('.bf-classesSliderCard');
                const currentDot = classesSliderTrack.parentElement.querySelector('.bf-classesSliderDot__active');

                if (slides.length > 2) {
                    const slideWidth = slides[0].offsetWidth;
                    const gap = slides[1].offsetLeft - slides[0].offsetWidth;

                    const nextDotIndex = Math.round(scrollLeft / (slideWidth + gap));

                    const nextDot = classesSliderTrack.parentElement.querySelector('.bf-classesSliderDot:nth-child(' + (nextDotIndex + 1) + ')');

                    if (nextDot) {
                        if (!nextDot.classList.contains('bf-classesSliderDot__active')) {
                            currentDot.classList.remove('bf-classesSliderDot__active');
                            nextDot.classList.add('bf-classesSliderDot__active');
                        }
                    }
                }
            }
        });


    // Back link

    document.querySelectorAll('.bf-simpleTitle_link')
        .forEach(simpleTitleLink => {
            simpleTitleLink.onclick = (e) => {
                e.preventDefault();
                window.history.back();
            }
        });


    // Contacts page

    document.querySelectorAll('.bf-contacts')
        .forEach(async contactsBlock => {
            const tabs = contactsBlock.querySelectorAll('.bf-tabs_tab');
            const map = contactsBlock.querySelector('.bf-contactsMap');
            const contactsContent = contactsBlock.querySelector('.bf-contactsBlock');

            const phoneField = contactsContent.querySelector('.bf-contactsBlock_text__phone');
            const addressField = contactsContent.querySelector('.bf-contactsBlock_text__address');
            const workTimeField = contactsContent.querySelector('.bf-contactsBlock_text__workTime');
            
            await ymaps3.ready;

            const {
                YMap,
                YMapDefaultSchemeLayer,
                YMapDefaultFeaturesLayer,
                YMapMarker
            } = ymaps3;
            
            const location = JSON.parse(map.dataset.init);
            const mapController = new YMap(
                map, {
                    location: {
                        center: [location[0] - (window.innerWidth >= 921 ? 0.008 : 0), location[1]],
                        zoom: 15
                    },
                    behaviors: ['drag', 'pinchZoom']
                },
                [
                    new YMapDefaultSchemeLayer(yaMapStyle),
                    new YMapDefaultFeaturesLayer({})
                ]
            );

            const markerElement = document.createElement('img');
            markerElement.className = 'bf-mapMarker';
            markerElement.src = "/wp-content/themes/Beflex/assets/imgs/map_marker.svg";
            markerElement.width = "44";
            markerElement.height = "56";
            markerElement.alt = "";

            let marker = new YMapMarker(
                {
                    coordinates: location
                },
                markerElement
            );

            mapController.addChild(marker);

            tabs.forEach(tab => {
                tab.onclick = () => {
                    const phone = tab.dataset.phone;
                    const address = tab.dataset.address;
                    const workTime = tab.dataset.worktime;
                    const location = JSON.parse(tab.dataset.location);

                    phoneField.textContent = phoneFormat(phone);
                    phoneField.href = phone;
                    addressField.textContent = address;
                    workTimeField.textContent = workTime;

                    tabs.forEach(tmpTab => {
                        tmpTab.classList.remove('bf-tabs_tab__active');
                    })

                    tab.classList.add('bf-tabs_tab__active');

                    mapController.setLocation({
                        center: [location[0] - (window.innerWidth >= 921 ? 0.008 : 0), location[1]],
                        zoom: 15
                    });

                    mapController.removeChild(marker);
                    marker = new YMapMarker(
                        {
                            coordinates: location
                        },
                        markerElement
                    );
                    mapController.addChild(marker);
                }
            });
        }
    );


    // FAQ

    document.querySelectorAll('.bf-faq')
            .forEach(faqBlock => {
                const questionHeaders = faqBlock.querySelectorAll('.bf-faqQuestion_header');

                questionHeaders.forEach(questionHeader => {
                    questionHeader.onclick = () => {
                        questionHeader.classList.toggle('bf-faqQuestion_header__open');
                    }
                });
            }
    );


    // Abonements

    document.querySelectorAll('.bf-studioAb')
            .forEach(abonementsBlock => {
                const types = abonementsBlock.querySelectorAll('.bf-studioAbType');

                types.forEach(type => {
                    type.onclick = () => {
                        const typeId = type.dataset.type;

                        const page = abonementsBlock.querySelector('#abonementPage_' + typeId);

                        const currentType = abonementsBlock.querySelector('.bf-studioAbType:not(.bf-button__outline)');
                        const currentPage = abonementsBlock.querySelector('.bf-studioAbPage__shown');

                        currentPage.classList.remove('bf-studioAbPage__shown');

                        currentType.classList.add('bf-button__outline');
                        type.classList.remove('bf-button__outline');

                        setTimeout(() => {
                            currentPage.style.display = 'none';
                            page.style.display = null;

                            setTimeout(() => {
                                page.classList.add('bf-studioAbPage__shown');
                            }, 50);
                        }, 400);
                    }
                });
            }
    );


    // Advantages

    document.querySelectorAll('.bf-studioAdvantages')
            .forEach(studioAdvantages => {
                let index = 0;

                const advantagesList = studioAdvantages.querySelector('.bf-studioAdvantages_list');

                const advantages = studioAdvantages.querySelectorAll('.bf-studioAdvantage');
                const buttons = studioAdvantages.querySelectorAll('.bf-studioAdvantageButton');

                const dots = studioAdvantages.querySelectorAll('.bf-classesSliderDot');

                buttons.forEach(advantagesButton => {
                    advantagesButton.onclick = () => {
                        const lastIndex = index;
                        
                        if (index < advantages.length - 1) {
                            index++;
                        }
                        else {
                            index = 0;
                        }
                        
                        setSlide(lastIndex, index);
                    }
                });

                dots.forEach(advantagesDot => {
                    advantagesDot.onclick = () => {
                        setSlide(index, advantagesDot.dataset.index);
                        index = advantagesDot.dataset.index;

                        const slides = advantagesList.querySelectorAll('.bf-studioAdvantage');
                        
                        if (slides.length > 1) {
                            const slideWidth = slides[0].offsetWidth;
                            const gap = slides[1].offsetLeft - slides[0].offsetWidth;
                            
                            advantagesList.scrollTo({
                                left: (slideWidth * gap) * index,
                                behavior: 'smooth'
                            });
                        }
                    }
                });

                advantagesList.onscroll = () => {
                    const scrollLeft = advantagesList.scrollLeft;
    
                    const slides = advantagesList.querySelectorAll('.bf-studioAdvantage');
                    const currentDot = advantagesList.parentElement.querySelector('.bf-classesSliderDot__active');
    
                    if (slides.length > 1) {
                        const slideWidth = slides[0].offsetWidth;
                        const gap = slides[1].offsetLeft - slides[0].offsetWidth;
    
                        const nextDotIndex = Math.round(scrollLeft / (slideWidth + gap));
    
                        const nextDot = advantagesList.parentElement.querySelector('.bf-classesSliderDot:nth-child(' + (nextDotIndex + 1) + ')');
    
                        if (nextDot) {
                            if (!nextDot.classList.contains('bf-classesSliderDot__active')) {
                                currentDot.classList.remove('bf-classesSliderDot__active');
                                nextDot.classList.add('bf-classesSliderDot__active');
                            }
                        }
                    }
                
                }

                const setSlide = (last, next) => {
                    advantages[last].classList.remove('bf-studioAdvantage__active');
                    advantages[next].style.display = null;
                    
                    dots[last].classList.remove('bf-classesSliderDot__active');

                    setTimeout(() => {
                        advantages[next].classList.add('bf-studioAdvantage__active');
                        dots[next].classList.add('bf-classesSliderDot__active');
                    }, 50);

                    setTimeout(() => {
                        advantages[last].style.display = 'none';
                    }, 400);
                }
            }
    );


    // Team

    document.querySelectorAll('.bf-studioCouchs')
            .forEach(teamBlock => {
                const couchList = teamBlock.querySelector('.bf-studioCouchs_list');

                const buttons = teamBlock.querySelectorAll('.bf-studioCouchsButton');

                const dots = teamBlock.querySelectorAll('.bf-classesSliderDot');

                const couchs = teamBlock.querySelectorAll('.bf-studioCouch');

                // Show modals
                couchs.forEach(couch => {
                    couch.onclick = () => {
                        const modal = document.querySelector('#couchModal' + couch.dataset.couch_id);

                        if (modal) {
                            const wrapper = modal.parentNode;
                            const bgModal = wrapper.querySelector('.bf-studioCouchsModalBG');

                            wrapper.style.display = null;

                            document.body.style.overflow = 'hidden';
                            const closeButton = modal.querySelector('.bf-studioCouchsModal_close');

                            setTimeout(() => {
                                bgModal.classList.add('bf-studioCouchsModalBG__shown');
                                modal.classList.add('bf-studioCouchsModal__shown');
                            }, 50);

                            bgModal.onclick = closeButton.onclick = () => {
                                bgModal.classList.remove('bf-studioCouchsModalBG__shown');
                                modal.classList.remove('bf-studioCouchsModal__shown');

                                setTimeout(() => {    
                                    document.body.style.overflow = null;
                                    wrapper.style.display = 'none';
                                }, 400);
                            }
                        }
                    }
                });

                // Scroll dots
                couchList.onscroll = () => {
                    const scrollLeft = couchList.scrollLeft;
    
                    const slides = couchList.querySelectorAll('.bf-studioCouch');
                    const currentDot = couchList.parentElement.querySelector('.bf-classesSliderDot__active');
    
                    if (slides.length > 1) {
                        const slideWidth = slides[0].offsetWidth;
                        const listPaddingLeft = parseInt(window.getComputedStyle(couchList, null).getPropertyValue('padding-left'))
                        const gap = slides[1].offsetLeft - listPaddingLeft - slides[0].offsetWidth;
    
                        const nextDotIndex = Math.round(scrollLeft / (slideWidth + gap));
    
                        const nextDot = couchList.parentElement.querySelector('.bf-classesSliderDot:nth-child(' + (nextDotIndex + 1) + ')');
    
                        if (nextDot) {
                            if (!nextDot.classList.contains('bf-classesSliderDot__active')) {
                                currentDot.classList.remove('bf-classesSliderDot__active');
                                nextDot.classList.add('bf-classesSliderDot__active');
                            }
                        }
                    }
                
                }

                buttons.forEach((button, i) => {
                        button.onclick = () => {
                            const slides = couchList.querySelectorAll('.bf-studioCouch');
                            
                            if (slides.length > 1) {
                                const slideWidth = slides[0].offsetWidth;
                                const listPaddingLeft = parseInt(window.getComputedStyle(couchList, null).getPropertyValue('padding-left'))
                                const gap = slides[1].offsetLeft - listPaddingLeft - slides[0].offsetWidth;
                                
                                couchList.scrollTo({
                                    left: ((slideWidth + gap) * (i === 0 ? -1 : 1)) + couchList.scrollLeft,
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }
                );
            }
    );


    // About slider

    document.querySelectorAll('.bf-aboutSlider')
            .forEach(aboutSlider => {
                const list = aboutSlider.querySelector('.bf-aboutSlider_list');
                const slides = aboutSlider.querySelectorAll('.bf-aboutSlide');
                const dots = aboutSlider.querySelectorAll('.bf-classesSliderDot');
                const arrows = aboutSlider.querySelectorAll('.bf-aboutSlide .bf-aboutSlideArrow');

                const mobArrow = aboutSlider.querySelector('.bf-aboutSlideArrow__mob');

                arrows.forEach(arrow => {
                    arrow.onclick = () => {
                        const tmpCurrentSlide = parseInt(arrow.dataset.i);
                        let tmpNextSlide = tmpCurrentSlide + 1;

                        if (tmpNextSlide > slides.length - 1) tmpNextSlide = 0;
                        if (tmpNextSlide < 0) tmpNextSlide = slides.length - 1;

                        slides[tmpNextSlide].style.display = null;

                        setTimeout(() => {
                            slides[tmpNextSlide].classList.add('bf-aboutSlide__active');
                            slides[tmpCurrentSlide].classList.remove('bf-aboutSlide__active');

                            dots[tmpNextSlide].classList.add('bf-classesSliderDot__active');
                            dots[tmpCurrentSlide].classList.remove('bf-classesSliderDot__active');

                            setTimeout(() => {
                                slides[tmpCurrentSlide].style.display = 'none';
                            }, 400);
                        }, 50);
                    }
                });
                
                list.onscroll = () => {
                    const scrollLeft = list.scrollLeft;
    
                    const currentDot = aboutSlider.querySelector('.bf-classesSliderDot__active');
    
                    if (slides.length > 1) {
                        const slideWidth = slides[0].offsetWidth;
                        const gap = slides[1].offsetLeft - slides[0].offsetWidth;
    
                        const nextDotIndex = Math.round(scrollLeft / (slideWidth + gap));
    
                        const nextDot = list.parentElement.querySelector('.bf-classesSliderDot:nth-child(' + (nextDotIndex + 1) + ')');
    
                        if (nextDot) {
                            if (!nextDot.classList.contains('bf-classesSliderDot__active')) {
                                currentDot.classList.remove('bf-classesSliderDot__active');
                                nextDot.classList.add('bf-classesSliderDot__active');
                            }
                        }
                    }
                
                }

                mobArrow.onclick = () => {
                    if (slides.length > 1) {
                        const slideWidth = slides[0].offsetWidth;
                        const gap = slides[1].offsetLeft - slides[0].offsetWidth;
                        
                        list.scrollTo({
                            left: (slideWidth * gap) + list.scrollLeft,
                            behavior: 'smooth'
                        });
                    }
                }
            }
    );


    // About uniq slider

    document.querySelectorAll('.bf-uniqSlider')
            .forEach(uniqSlider => {

                let index = 0;

                const list = uniqSlider.querySelector('.bf-uniqSlider_list');
                const slidesGroup = uniqSlider.querySelectorAll('.bf-uniqSliderGroup');
                const slides = uniqSlider.querySelectorAll('.bf-uniqSliderGroup_slide');
                const dots = uniqSlider.querySelectorAll('.bf-classesSliderDot');
                const arrows = uniqSlider.querySelectorAll('.bf-uniqSliderControls_button');

                arrows.forEach(arrow => {
                    arrow.onclick = () => {
                        const lastIndex = index;
                        index += parseInt(arrow.dataset.i);

                        if (index > slidesGroup.length - 1) index = 0;
                        if (index < 0) index = slidesGroup.length - 1;

                        slidesGroup[index].style.display = null;

                        setTimeout(() => {
                            slidesGroup[index].classList.add('bf-uniqSliderGroup__active');
                            slidesGroup[lastIndex].classList.remove('bf-uniqSliderGroup__active');

                            dots[index * 2].classList.add('bf-classesSliderDot__active');
                            dots[lastIndex * 2].classList.remove('bf-classesSliderDot__active');

                            setTimeout(() => {
                                slidesGroup[lastIndex].style.display = 'none';
                            }, 400);
                        }, 50);
                    }
                });
                
                list.onscroll = () => {
                    const scrollLeft = list.scrollLeft;
    
                    const currentDot = uniqSlider.querySelector('.bf-classesSliderDot__active');
    
                    if (slides.length > 1) {
                        const slideWidth = slides[0].offsetWidth;
                        const gap = slides[1].offsetLeft - slides[0].offsetWidth;
    
                        const nextDotIndex = Math.round(scrollLeft / (slideWidth + gap));
    
                        const nextDot = list.parentElement.querySelector('.bf-classesSliderDot:nth-child(' + (nextDotIndex + 1) + ')');
    
                        if (nextDot) {
                            if (!nextDot.classList.contains('bf-classesSliderDot__active')) {
                                currentDot.classList.remove('bf-classesSliderDot__active');
                                nextDot.classList.add('bf-classesSliderDot__active');
                            }
                        }
                    }
                
                }
            }
    );


    // Founders slider

    document.querySelectorAll('.bf-founders')
            .forEach(foundersSlider => {

                const list = foundersSlider.querySelector('.bf-founders_list');
                const slides = foundersSlider.querySelectorAll('.bf-founder');

                list.onscroll = () => {
                    const scrollLeft = list.scrollLeft;
    
                    const currentDot = foundersSlider.querySelector('.bf-classesSliderDot__active');
    
                    if (slides.length > 1) {
                        const slideWidth = slides[0].offsetWidth;
                        const gap = slides[1].offsetLeft - slides[0].offsetWidth;
    
                        const nextDotIndex = Math.round(scrollLeft / (slideWidth + gap));
    
                        const nextDot = list.parentElement.querySelector('.bf-classesSliderDot:nth-child(' + (nextDotIndex + 1) + ')');
    
                        if (nextDot) {
                            if (!nextDot.classList.contains('bf-classesSliderDot__active')) {
                                currentDot.classList.remove('bf-classesSliderDot__active');
                                nextDot.classList.add('bf-classesSliderDot__active');
                            }
                        }
                    }
                
                }
            }
    );


    // Infocards slider

    document.querySelectorAll('.bf-franchizeInfoCards')
            .forEach(infoCardsSlider => {

                const list = infoCardsSlider.querySelector('.bf-franchizeInfoCards_list');
                const slides = infoCardsSlider.querySelectorAll('.bf-franchizeInfoCard');

                list.onscroll = () => {
                    const scrollLeft = list.scrollLeft;
    
                    const currentDot = infoCardsSlider.querySelector('.bf-classesSliderDot__active');
    
                    if (slides.length > 1) {
                        const slideWidth = slides[0].offsetWidth;
                        const gap = slides[1].offsetLeft - slides[0].offsetWidth;
    
                        const nextDotIndex = Math.round(scrollLeft / (slideWidth + gap));
    
                        const nextDot = list.parentElement.querySelector('.bf-classesSliderDot:nth-child(' + (nextDotIndex + 1) + ')');
    
                        if (nextDot) {
                            if (!nextDot.classList.contains('bf-classesSliderDot__active')) {
                                currentDot.classList.remove('bf-classesSliderDot__active');
                                nextDot.classList.add('bf-classesSliderDot__active');
                            }
                        }
                    }
                
                }
            }
    );


    // Plans slider

    document.querySelectorAll('.bf-franchizePlans')
            .forEach(plansSlider => {

                const list = plansSlider.querySelector('.bf-franchizePlans_list');
                const slides = plansSlider.querySelectorAll('.bf-franchizePlan');

                list.onscroll = () => {
                    const scrollLeft = list.scrollLeft;
    
                    const currentDot = plansSlider.querySelector('.bf-classesSliderDot__active');
    
                    if (slides.length > 1) {
                        const slideWidth = slides[0].offsetWidth;
                        const gap = slides[1].offsetLeft - slides[0].offsetWidth;
    
                        const nextDotIndex = Math.round(scrollLeft / (slideWidth + gap));
    
                        const nextDot = list.parentElement.querySelector('.bf-classesSliderDot:nth-child(' + (nextDotIndex + 1) + ')');
    
                        if (nextDot) {
                            if (!nextDot.classList.contains('bf-classesSliderDot__active')) {
                                currentDot.classList.remove('bf-classesSliderDot__active');
                                nextDot.classList.add('bf-classesSliderDot__active');
                            }
                        }
                    }
                
                }
            }
    );


    // Modals

    let currentModal = null;

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const showModal = async (className) => {
        const modals = document.querySelector('.bf-modals');

        if (modals) {
            const bg = modals.querySelector('.bf-modals_bg');
            const modal = typeof className === 'string' ?
                            modals.querySelector(className) : className;
            const modalWrapper = modal.parentNode;

            if (modal.dataset.redirect) {
                location.href = modal.dataset.redirect;
                return false;
            }

            if (modal) {
                modals.style.display = null;
                document.body.style.overflow = "hidden";
    
                setTimeout(() => {
                    bg.classList.add('bf-modals_bg__shown');
                    modalWrapper.classList.add('bf-modalWrapper__shown');
                }, 50);

                currentModal = modal; 
            }
        }
    }

    const closeModal = async (className) => {
        const modals = document.querySelector('.bf-modals');

        if (modals) {
            const bg = modals.querySelector('.bf-modals_bg');
            const modal = typeof className === 'string' ?
                            modals.querySelector(className) : className;
            const modalWrapper = modal.parentNode;
            
            if (modal) {
                bg.classList.remove('bf-modals_bg__shown');
                modalWrapper.classList.remove('bf-modalWrapper__shown');
    
                await timeout(400);
                modals.style.display = "none";
                document.body.style.overflow = null;
                
                currentModal = null;
            }
        }
    }

    const feedbackDone = async (className, status = true) => {
        if (className) {
            const modal = typeof className === 'string' ?
                            modals.querySelector(className) : className;
    
            const form = modal.querySelector('form');
            form.querySelectorAll('input').forEach(formInput => {
                if (formInput.type === 'checkbox') {
                    formInput.checked = false;
                }
                else {
                    formInput.value = '';
                }
            });
            
            await closeModal(currentModal);
        }

        if (status) {
            showModal('.bf-modal__feedback');
        }
        else {
            showModal('.bf-modal__error');
        }
    }

    (() => {
        const modals = document.querySelector('.bf-modals');

        if (modals) {
            const bg = modals.querySelector('.bf-modals_bg');
            
            document.querySelectorAll('.bf-modal_close')
                    .forEach(closeModalButton => {
                        closeModalButton.onclick = () => {
                            closeModal(closeModalButton.parentNode);
                        }
                    }
            );

            bg.onclick = () => {
                if (currentModal) {
                    closeModal(currentModal);
                }
            }
        }
    })();


    const showPromoModal = () => {
        setTimeout(() => {
            if (!currentModal) {
                const hasShown = localStorage.getItem('modalTimer');
                if (!hasShown) {
                    localStorage.setItem('modalTimer', new Date().getTime() + (5 * 60 * 1000));
                    showModal('.bf-modal__callback');
                }
                else {
                    if (new Date().getTime() > hasShown) {
                        localStorage.setItem('modalTimer', new Date().getTime() + (5 * 60 * 1000));
                        showModal('.bf-modal__callback');
                    }
                }
            }
            else {
                showPromoModal();
            }
        }, 10000);
    }

    const courceModalButton = document.querySelector('a[href="#cource-modal"]');
    if (courceModalButton) {
        courceModalButton.onclick = (e) => {
            e.preventDefault();
            showModal('.bf-modal__cource');
        }
    }

    const testClassModalButtons = document.querySelectorAll('.bf-studioBanner_button, a[href="#test"]');
    testClassModalButtons.forEach(testClassModalButton => {
            testClassModalButton.onclick = (e) => {
                e.preventDefault();
                showModal('.bf-modal__test');
            }
        }
    );

    const sheduleModalButton = document.querySelector('a[href="#shedule"]');
    if (sheduleModalButton) {
        sheduleModalButton.onclick = (e) => {
            e.preventDefault();
            showModal('.bf-modal__studios');
        }
    }

    const legalModalButton = document.querySelector('a[href="#yuridicheskaya-informaciya"]');
    if (legalModalButton) {
        legalModalButton.onclick = (e) => {
            e.preventDefault();
            showModal('.bf-modal__legal');
        }
    }

    const bookModalButton = document.querySelector('.bf-classInfoActions_button');
    if (bookModalButton) {
        bookModalButton.onclick = (e) => {
            e.preventDefault();
            showModal('.bf-modal__book');
        }
    }

    document.querySelectorAll('.bf-franchizePlan_button,.bf-franchizeStepsButton')
            .forEach(franchizeButton => {
                franchizeButton.onclick = (e) => {
                    e.preventDefault();
                    showModal('.bf-modal__franchize');
                }
            }
    );

    const feedback = async (name, surname = "", phone, email = "", type) => {
        const formData = new FormData();
        formData.append('action', 'feedback_form');
        formData.append('name', name);
        formData.append('surname', surname);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('url', window.location.href);
        formData.append('message_type', type);

        const request = await fetch('/wp-admin/admin-ajax.php', {
            method: 'POST',
            body: formData
        });

        if (!request.ok) {
            return false;
        }
            
        const response = await request.json();

        if (response['success']) {
            if (response['data'] === 'success') {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    document.querySelector('#modal-callback').onsubmit = async (e) => {
        e.preventDefault();

        const result = await feedback(
            e.target.name.value,
            e.target.surname.value,
            e.target.phone.value,
            e.target.email.value,
            'Обратный звонок'
        );

        feedbackDone(currentModal, result);
    }

    document.querySelector('#modal-test').onsubmit = async (e) => {
        e.preventDefault();

        const result = await feedback(
            e.target.name.value,
            e.target.surname.value,
            e.target.phone.value,
            e.target.email.value,
            'Пробное занятие'
        );

        feedbackDone(currentModal, result);
    }

    document.querySelector('#modal-book').onsubmit = async (e) => {
        e.preventDefault();

        const result = await feedback(
            e.target.name.value,
            e.target.surname.value,
            e.target.phone.value,
            e.target.email.value,
            'Запись на занятие'
        );

        feedbackDone(currentModal, result);
    }

    document.querySelector('#modal-franchize').onsubmit = async (e) => {
        e.preventDefault();

        const result = await feedback(
            e.target.name.value,
            '',
            e.target.phone.value,
            e.target.email.value,
            'Консультация по франшизе'
        );

        feedbackDone(currentModal, result);
    }

    document.querySelector('#modal-cource').onsubmit = async (e) => {
        e.preventDefault();

        const result = await feedback(
            e.target.name.value,
            e.target.surname.value,
            e.target.phone.value,
            e.target.email.value,
            'Покупка онлайн-курса'
        );

        feedbackDone(currentModal, result);
    }

    document.querySelectorAll('.bf-feedback_form')
            .forEach(feedbackForm => {
                feedbackForm.onsubmit = async (e) => {
                    e.preventDefault();
            
                    const result = await feedback(
                        e.target.name.value,
                        '',
                        e.target.phone.value,
                        '',
                        feedbackForm.dataset.type
                    );
            
                    feedbackDone(currentModal, result);

                    feedbackForm.querySelectorAll('input')
                                .forEach(formField => {
                                    if (formField.type === 'checkbox') {
                                        formField.checked = false;
                                    }
                                    else {
                                        formField.value = '';
                                    }
                                }
                    );
                }
            }
    );

    
    // Header background changer

    const headerOnMainPage = document.querySelector('.bf-header__main');
    if (headerOnMainPage) {
        document.onscroll = () => {
            if (
                document.scrollingElement.scrollTop > 500 &&
                !headerOnMainPage.classList.contains('bf-header__bgWhite')
            )
            {
                headerOnMainPage.classList.add('bf-header__bgWhite');
                return;
            }

            if (
                document.scrollingElement.scrollTop <= 500 &&
                headerOnMainPage.classList.contains('bf-header__bgWhite')
            )
            {
                headerOnMainPage.classList.remove('bf-header__bgWhite');
            }
        }
    }


    // Action buttons

    const actionCallback = document.querySelector('.bf-actionButton');
    if (actionCallback) {
        const callBackButton = actionCallback.querySelector('#actionButtonOpen');
        const closeActionButton = actionCallback.querySelector('#actionButtonClose');

        callBackButton.onclick = () => {
            if (actionCallback.children.length > 2) {
                if (actionCallback.classList.contains('bf-actionButton__shown')) {
                    actionCallback.classList.remove('bf-actionButton__shown');
                    showModal('.bf-modal__callback');
                }
                else {
                    actionCallback.classList.add('bf-actionButton__shown');
                }
            }
            else {
                showModal('.bf-modal__callback');
            }
        }

        closeActionButton.onclick = () => {
            actionCallback.classList.remove('bf-actionButton__shown');
        }
    }


    // Smooth anchor links

    document.querySelectorAll('.bf-achorLink')
            .forEach(link => {
                link.onclick = e => {
                    e.preventDefault();
                    const targetElement = document.querySelector(link.dataset.link);
                    if (targetElement) {
                        const headerHeight = document.querySelector('.bf-header').offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                };
            }
    );
});

var yaMapStyle = {
    customization: [
        {
            "tags": "country",
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#8c8c8c"
                },
                {
                    "zoom": 0,
                    "opacity": 0.8
                },
                {
                    "zoom": 1,
                    "opacity": 0.8
                },
                {
                    "zoom": 2,
                    "opacity": 0.8
                },
                {
                    "zoom": 3,
                    "opacity": 0.8
                },
                {
                    "zoom": 4,
                    "opacity": 0.8
                },
                {
                    "zoom": 5,
                    "opacity": 1
                },
                {
                    "zoom": 6,
                    "opacity": 1
                },
                {
                    "zoom": 7,
                    "opacity": 1
                },
                {
                    "zoom": 8,
                    "opacity": 1
                },
                {
                    "zoom": 9,
                    "opacity": 1
                },
                {
                    "zoom": 10,
                    "opacity": 1
                },
                {
                    "zoom": 11,
                    "opacity": 1
                },
                {
                    "zoom": 12,
                    "opacity": 1
                },
                {
                    "zoom": 13,
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "country",
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#dedede"
                },
                {
                    "zoom": 0,
                    "opacity": 0.15
                },
                {
                    "zoom": 1,
                    "opacity": 0.15
                },
                {
                    "zoom": 2,
                    "opacity": 0.15
                },
                {
                    "zoom": 3,
                    "opacity": 0.15
                },
                {
                    "zoom": 4,
                    "opacity": 0.15
                },
                {
                    "zoom": 5,
                    "opacity": 0.15
                },
                {
                    "zoom": 6,
                    "opacity": 0.25
                },
                {
                    "zoom": 7,
                    "opacity": 0.5
                },
                {
                    "zoom": 8,
                    "opacity": 0.47
                },
                {
                    "zoom": 9,
                    "opacity": 0.44
                },
                {
                    "zoom": 10,
                    "opacity": 0.41
                },
                {
                    "zoom": 11,
                    "opacity": 0.38
                },
                {
                    "zoom": 12,
                    "opacity": 0.35
                },
                {
                    "zoom": 13,
                    "opacity": 0.33
                },
                {
                    "zoom": 14,
                    "opacity": 0.3
                },
                {
                    "zoom": 15,
                    "opacity": 0.28
                },
                {
                    "zoom": 16,
                    "opacity": 0.25
                },
                {
                    "zoom": 17,
                    "opacity": 0.25
                },
                {
                    "zoom": 18,
                    "opacity": 0.25
                },
                {
                    "zoom": 19,
                    "opacity": 0.25
                },
                {
                    "zoom": 20,
                    "opacity": 0.25
                },
                {
                    "zoom": 21,
                    "opacity": 0.25
                }
            ]
        },
        {
            "tags": "region",
            "elements": "geometry.fill",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#a6a6a6",
                    "opacity": 0.5
                },
                {
                    "zoom": 1,
                    "color": "#a6a6a6",
                    "opacity": 0.5
                },
                {
                    "zoom": 2,
                    "color": "#a6a6a6",
                    "opacity": 0.5
                },
                {
                    "zoom": 3,
                    "color": "#a6a6a6",
                    "opacity": 0.5
                },
                {
                    "zoom": 4,
                    "color": "#a6a6a6",
                    "opacity": 0.5
                },
                {
                    "zoom": 5,
                    "color": "#a6a6a6",
                    "opacity": 0.5
                },
                {
                    "zoom": 6,
                    "color": "#a6a6a6",
                    "opacity": 1
                },
                {
                    "zoom": 7,
                    "color": "#a6a6a6",
                    "opacity": 1
                },
                {
                    "zoom": 8,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 9,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 10,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 11,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 12,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 13,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "color": "#8c8c8c",
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "color": "#8c8c8c",
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "region",
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#dedede"
                },
                {
                    "zoom": 0,
                    "opacity": 0.15
                },
                {
                    "zoom": 1,
                    "opacity": 0.15
                },
                {
                    "zoom": 2,
                    "opacity": 0.15
                },
                {
                    "zoom": 3,
                    "opacity": 0.15
                },
                {
                    "zoom": 4,
                    "opacity": 0.15
                },
                {
                    "zoom": 5,
                    "opacity": 0.15
                },
                {
                    "zoom": 6,
                    "opacity": 0.25
                },
                {
                    "zoom": 7,
                    "opacity": 0.5
                },
                {
                    "zoom": 8,
                    "opacity": 0.47
                },
                {
                    "zoom": 9,
                    "opacity": 0.44
                },
                {
                    "zoom": 10,
                    "opacity": 0.41
                },
                {
                    "zoom": 11,
                    "opacity": 0.38
                },
                {
                    "zoom": 12,
                    "opacity": 0.35
                },
                {
                    "zoom": 13,
                    "opacity": 0.33
                },
                {
                    "zoom": 14,
                    "opacity": 0.3
                },
                {
                    "zoom": 15,
                    "opacity": 0.28
                },
                {
                    "zoom": 16,
                    "opacity": 0.25
                },
                {
                    "zoom": 17,
                    "opacity": 0.25
                },
                {
                    "zoom": 18,
                    "opacity": 0.25
                },
                {
                    "zoom": 19,
                    "opacity": 0.25
                },
                {
                    "zoom": 20,
                    "opacity": 0.25
                },
                {
                    "zoom": 21,
                    "opacity": 0.25
                }
            ]
        },
        {
            "tags": {
                "any": "admin",
                "none": [
                    "country",
                    "region",
                    "locality",
                    "district",
                    "address"
                ]
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#8c8c8c"
                },
                {
                    "zoom": 0,
                    "opacity": 0.5
                },
                {
                    "zoom": 1,
                    "opacity": 0.5
                },
                {
                    "zoom": 2,
                    "opacity": 0.5
                },
                {
                    "zoom": 3,
                    "opacity": 0.5
                },
                {
                    "zoom": 4,
                    "opacity": 0.5
                },
                {
                    "zoom": 5,
                    "opacity": 0.5
                },
                {
                    "zoom": 6,
                    "opacity": 1
                },
                {
                    "zoom": 7,
                    "opacity": 1
                },
                {
                    "zoom": 8,
                    "opacity": 1
                },
                {
                    "zoom": 9,
                    "opacity": 1
                },
                {
                    "zoom": 10,
                    "opacity": 1
                },
                {
                    "zoom": 11,
                    "opacity": 1
                },
                {
                    "zoom": 12,
                    "opacity": 1
                },
                {
                    "zoom": 13,
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": {
                "any": "admin",
                "none": [
                    "country",
                    "region",
                    "locality",
                    "district",
                    "address"
                ]
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#dedede"
                },
                {
                    "zoom": 0,
                    "opacity": 0.15
                },
                {
                    "zoom": 1,
                    "opacity": 0.15
                },
                {
                    "zoom": 2,
                    "opacity": 0.15
                },
                {
                    "zoom": 3,
                    "opacity": 0.15
                },
                {
                    "zoom": 4,
                    "opacity": 0.15
                },
                {
                    "zoom": 5,
                    "opacity": 0.15
                },
                {
                    "zoom": 6,
                    "opacity": 0.25
                },
                {
                    "zoom": 7,
                    "opacity": 0.5
                },
                {
                    "zoom": 8,
                    "opacity": 0.47
                },
                {
                    "zoom": 9,
                    "opacity": 0.44
                },
                {
                    "zoom": 10,
                    "opacity": 0.41
                },
                {
                    "zoom": 11,
                    "opacity": 0.38
                },
                {
                    "zoom": 12,
                    "opacity": 0.35
                },
                {
                    "zoom": 13,
                    "opacity": 0.33
                },
                {
                    "zoom": 14,
                    "opacity": 0.3
                },
                {
                    "zoom": 15,
                    "opacity": 0.28
                },
                {
                    "zoom": 16,
                    "opacity": 0.25
                },
                {
                    "zoom": 17,
                    "opacity": 0.25
                },
                {
                    "zoom": 18,
                    "opacity": 0.25
                },
                {
                    "zoom": 19,
                    "opacity": 0.25
                },
                {
                    "zoom": 20,
                    "opacity": 0.25
                },
                {
                    "zoom": 21,
                    "opacity": 0.25
                }
            ]
        },
        {
            "tags": {
                "any": "landcover",
                "none": "vegetation"
            },
            "stylers": [
                {
                    "hue": "#c7cfd6"
                }
            ]
        },
        {
            "tags": "vegetation",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#aab6c0",
                    "opacity": 0.1
                },
                {
                    "zoom": 1,
                    "color": "#aab6c0",
                    "opacity": 0.1
                },
                {
                    "zoom": 2,
                    "color": "#aab6c0",
                    "opacity": 0.1
                },
                {
                    "zoom": 3,
                    "color": "#aab6c0",
                    "opacity": 0.1
                },
                {
                    "zoom": 4,
                    "color": "#aab6c0",
                    "opacity": 0.1
                },
                {
                    "zoom": 5,
                    "color": "#aab6c0",
                    "opacity": 0.1
                },
                {
                    "zoom": 6,
                    "color": "#aab6c0",
                    "opacity": 0.2
                },
                {
                    "zoom": 7,
                    "color": "#c7cfd6",
                    "opacity": 0.3
                },
                {
                    "zoom": 8,
                    "color": "#c7cfd6",
                    "opacity": 0.4
                },
                {
                    "zoom": 9,
                    "color": "#c7cfd6",
                    "opacity": 0.6
                },
                {
                    "zoom": 10,
                    "color": "#c7cfd6",
                    "opacity": 0.8
                },
                {
                    "zoom": 11,
                    "color": "#c7cfd6",
                    "opacity": 1
                },
                {
                    "zoom": 12,
                    "color": "#c7cfd6",
                    "opacity": 1
                },
                {
                    "zoom": 13,
                    "color": "#c7cfd6",
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "color": "#cdd4da",
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "color": "#d3d9df",
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "color": "#d3d9df",
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "color": "#d3d9df",
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "color": "#d3d9df",
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "color": "#d3d9df",
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "color": "#d3d9df",
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "color": "#d3d9df",
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "park",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 1,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 2,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 3,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 4,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 5,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 6,
                    "color": "#c7cfd6",
                    "opacity": 0.2
                },
                {
                    "zoom": 7,
                    "color": "#c7cfd6",
                    "opacity": 0.3
                },
                {
                    "zoom": 8,
                    "color": "#c7cfd6",
                    "opacity": 0.4
                },
                {
                    "zoom": 9,
                    "color": "#c7cfd6",
                    "opacity": 0.6
                },
                {
                    "zoom": 10,
                    "color": "#c7cfd6",
                    "opacity": 0.8
                },
                {
                    "zoom": 11,
                    "color": "#c7cfd6",
                    "opacity": 1
                },
                {
                    "zoom": 12,
                    "color": "#c7cfd6",
                    "opacity": 1
                },
                {
                    "zoom": 13,
                    "color": "#c7cfd6",
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "color": "#cdd4da",
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "color": "#d3d9df",
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "color": "#d3d9df",
                    "opacity": 0.9
                },
                {
                    "zoom": 17,
                    "color": "#d3d9df",
                    "opacity": 0.8
                },
                {
                    "zoom": 18,
                    "color": "#d3d9df",
                    "opacity": 0.7
                },
                {
                    "zoom": 19,
                    "color": "#d3d9df",
                    "opacity": 0.7
                },
                {
                    "zoom": 20,
                    "color": "#d3d9df",
                    "opacity": 0.7
                },
                {
                    "zoom": 21,
                    "color": "#d3d9df",
                    "opacity": 0.7
                }
            ]
        },
        {
            "tags": "national_park",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 1,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 2,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 3,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 4,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 5,
                    "color": "#c7cfd6",
                    "opacity": 0.1
                },
                {
                    "zoom": 6,
                    "color": "#c7cfd6",
                    "opacity": 0.2
                },
                {
                    "zoom": 7,
                    "color": "#c7cfd6",
                    "opacity": 0.3
                },
                {
                    "zoom": 8,
                    "color": "#c7cfd6",
                    "opacity": 0.4
                },
                {
                    "zoom": 9,
                    "color": "#c7cfd6",
                    "opacity": 0.6
                },
                {
                    "zoom": 10,
                    "color": "#c7cfd6",
                    "opacity": 0.8
                },
                {
                    "zoom": 11,
                    "color": "#c7cfd6",
                    "opacity": 1
                },
                {
                    "zoom": 12,
                    "color": "#c7cfd6",
                    "opacity": 1
                },
                {
                    "zoom": 13,
                    "color": "#c7cfd6",
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "color": "#cdd4da",
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "color": "#d3d9df",
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "color": "#d3d9df",
                    "opacity": 0.7
                },
                {
                    "zoom": 17,
                    "color": "#d3d9df",
                    "opacity": 0.7
                },
                {
                    "zoom": 18,
                    "color": "#d3d9df",
                    "opacity": 0.7
                },
                {
                    "zoom": 19,
                    "color": "#d3d9df",
                    "opacity": 0.7
                },
                {
                    "zoom": 20,
                    "color": "#d3d9df",
                    "opacity": 0.7
                },
                {
                    "zoom": 21,
                    "color": "#d3d9df",
                    "opacity": 0.7
                }
            ]
        },
        {
            "tags": "cemetery",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 1,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 2,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 3,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 4,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 5,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 6,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 7,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 8,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 9,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 10,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 11,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 12,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 13,
                    "color": "#c7cfd6"
                },
                {
                    "zoom": 14,
                    "color": "#cdd4da"
                },
                {
                    "zoom": 15,
                    "color": "#d3d9df"
                },
                {
                    "zoom": 16,
                    "color": "#d3d9df"
                },
                {
                    "zoom": 17,
                    "color": "#d3d9df"
                },
                {
                    "zoom": 18,
                    "color": "#d3d9df"
                },
                {
                    "zoom": 19,
                    "color": "#d3d9df"
                },
                {
                    "zoom": 20,
                    "color": "#d3d9df"
                },
                {
                    "zoom": 21,
                    "color": "#d3d9df"
                }
            ]
        },
        {
            "tags": "sports_ground",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 1,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 2,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 3,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 4,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 5,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 6,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 7,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 8,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 9,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 10,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 11,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 12,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 13,
                    "color": "#b8c2cb",
                    "opacity": 0
                },
                {
                    "zoom": 14,
                    "color": "#bec7cf",
                    "opacity": 0
                },
                {
                    "zoom": 15,
                    "color": "#c4ccd4",
                    "opacity": 0.5
                },
                {
                    "zoom": 16,
                    "color": "#c5cdd5",
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "color": "#c6ced5",
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "color": "#c7ced6",
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "color": "#c8cfd7",
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "color": "#c9d0d7",
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "color": "#cad1d8",
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "terrain",
            "elements": "geometry",
            "stylers": [
                {
                    "hue": "#e1e3e5"
                },
                {
                    "zoom": 0,
                    "opacity": 0.3
                },
                {
                    "zoom": 1,
                    "opacity": 0.3
                },
                {
                    "zoom": 2,
                    "opacity": 0.3
                },
                {
                    "zoom": 3,
                    "opacity": 0.3
                },
                {
                    "zoom": 4,
                    "opacity": 0.3
                },
                {
                    "zoom": 5,
                    "opacity": 0.35
                },
                {
                    "zoom": 6,
                    "opacity": 0.4
                },
                {
                    "zoom": 7,
                    "opacity": 0.6
                },
                {
                    "zoom": 8,
                    "opacity": 0.8
                },
                {
                    "zoom": 9,
                    "opacity": 0.9
                },
                {
                    "zoom": 10,
                    "opacity": 1
                },
                {
                    "zoom": 11,
                    "opacity": 1
                },
                {
                    "zoom": 12,
                    "opacity": 1
                },
                {
                    "zoom": 13,
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "geographic_line",
            "elements": "geometry",
            "stylers": [
                {
                    "color": "#747d86"
                }
            ]
        },
        {
            "tags": "land",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#e1e3e4"
                },
                {
                    "zoom": 1,
                    "color": "#e1e3e4"
                },
                {
                    "zoom": 2,
                    "color": "#e1e3e4"
                },
                {
                    "zoom": 3,
                    "color": "#e1e3e4"
                },
                {
                    "zoom": 4,
                    "color": "#e1e3e4"
                },
                {
                    "zoom": 5,
                    "color": "#e4e5e6"
                },
                {
                    "zoom": 6,
                    "color": "#e6e8e9"
                },
                {
                    "zoom": 7,
                    "color": "#e9eaeb"
                },
                {
                    "zoom": 8,
                    "color": "#ecedee"
                },
                {
                    "zoom": 9,
                    "color": "#ecedee"
                },
                {
                    "zoom": 10,
                    "color": "#ecedee"
                },
                {
                    "zoom": 11,
                    "color": "#ecedee"
                },
                {
                    "zoom": 12,
                    "color": "#ecedee"
                },
                {
                    "zoom": 13,
                    "color": "#ecedee"
                },
                {
                    "zoom": 14,
                    "color": "#eeeff0"
                },
                {
                    "zoom": 15,
                    "color": "#f1f2f3"
                },
                {
                    "zoom": 16,
                    "color": "#f1f2f3"
                },
                {
                    "zoom": 17,
                    "color": "#f2f3f4"
                },
                {
                    "zoom": 18,
                    "color": "#f2f3f4"
                },
                {
                    "zoom": 19,
                    "color": "#f3f4f4"
                },
                {
                    "zoom": 20,
                    "color": "#f3f4f5"
                },
                {
                    "zoom": 21,
                    "color": "#f4f5f5"
                }
            ]
        },
        {
            "tags": "residential",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 1,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 2,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 3,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 4,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 5,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 6,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 7,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 8,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 9,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 10,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 11,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 12,
                    "color": "#e1e3e5",
                    "opacity": 0.5
                },
                {
                    "zoom": 13,
                    "color": "#e1e3e5",
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "color": "#e6e8e9",
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "color": "#ecedee",
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "color": "#edeeef",
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "color": "#eeeff0",
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "color": "#eeeff0",
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "color": "#eff0f1",
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "color": "#f0f1f2",
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "color": "#f1f2f3",
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "locality",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 1,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 2,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 3,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 4,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 5,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 6,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 7,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 8,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 9,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 10,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 11,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 12,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 13,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 14,
                    "color": "#e6e8e9"
                },
                {
                    "zoom": 15,
                    "color": "#ecedee"
                },
                {
                    "zoom": 16,
                    "color": "#edeeef"
                },
                {
                    "zoom": 17,
                    "color": "#eeeff0"
                },
                {
                    "zoom": 18,
                    "color": "#eeeff0"
                },
                {
                    "zoom": 19,
                    "color": "#eff0f1"
                },
                {
                    "zoom": 20,
                    "color": "#f0f1f2"
                },
                {
                    "zoom": 21,
                    "color": "#f1f2f3"
                }
            ]
        },
        {
            "tags": {
                "any": "structure",
                "none": [
                    "building",
                    "fence"
                ]
            },
            "elements": "geometry",
            "stylers": [
                {
                    "opacity": 0.9
                },
                {
                    "zoom": 0,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 1,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 2,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 3,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 4,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 5,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 6,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 7,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 8,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 9,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 10,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 11,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 12,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 13,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 14,
                    "color": "#e6e8e9"
                },
                {
                    "zoom": 15,
                    "color": "#ecedee"
                },
                {
                    "zoom": 16,
                    "color": "#edeeef"
                },
                {
                    "zoom": 17,
                    "color": "#eeeff0"
                },
                {
                    "zoom": 18,
                    "color": "#eeeff0"
                },
                {
                    "zoom": 19,
                    "color": "#eff0f1"
                },
                {
                    "zoom": 20,
                    "color": "#f0f1f2"
                },
                {
                    "zoom": 21,
                    "color": "#f1f2f3"
                }
            ]
        },
        {
            "tags": "building",
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#dee0e3"
                },
                {
                    "zoom": 0,
                    "opacity": 0.7
                },
                {
                    "zoom": 1,
                    "opacity": 0.7
                },
                {
                    "zoom": 2,
                    "opacity": 0.7
                },
                {
                    "zoom": 3,
                    "opacity": 0.7
                },
                {
                    "zoom": 4,
                    "opacity": 0.7
                },
                {
                    "zoom": 5,
                    "opacity": 0.7
                },
                {
                    "zoom": 6,
                    "opacity": 0.7
                },
                {
                    "zoom": 7,
                    "opacity": 0.7
                },
                {
                    "zoom": 8,
                    "opacity": 0.7
                },
                {
                    "zoom": 9,
                    "opacity": 0.7
                },
                {
                    "zoom": 10,
                    "opacity": 0.7
                },
                {
                    "zoom": 11,
                    "opacity": 0.7
                },
                {
                    "zoom": 12,
                    "opacity": 0.7
                },
                {
                    "zoom": 13,
                    "opacity": 0.7
                },
                {
                    "zoom": 14,
                    "opacity": 0.7
                },
                {
                    "zoom": 15,
                    "opacity": 0.7
                },
                {
                    "zoom": 16,
                    "opacity": 0.9
                },
                {
                    "zoom": 17,
                    "opacity": 0.6
                },
                {
                    "zoom": 18,
                    "opacity": 0.6
                },
                {
                    "zoom": 19,
                    "opacity": 0.6
                },
                {
                    "zoom": 20,
                    "opacity": 0.6
                },
                {
                    "zoom": 21,
                    "opacity": 0.6
                }
            ]
        },
        {
            "tags": "building",
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd1"
                },
                {
                    "zoom": 0,
                    "opacity": 0.5
                },
                {
                    "zoom": 1,
                    "opacity": 0.5
                },
                {
                    "zoom": 2,
                    "opacity": 0.5
                },
                {
                    "zoom": 3,
                    "opacity": 0.5
                },
                {
                    "zoom": 4,
                    "opacity": 0.5
                },
                {
                    "zoom": 5,
                    "opacity": 0.5
                },
                {
                    "zoom": 6,
                    "opacity": 0.5
                },
                {
                    "zoom": 7,
                    "opacity": 0.5
                },
                {
                    "zoom": 8,
                    "opacity": 0.5
                },
                {
                    "zoom": 9,
                    "opacity": 0.5
                },
                {
                    "zoom": 10,
                    "opacity": 0.5
                },
                {
                    "zoom": 11,
                    "opacity": 0.5
                },
                {
                    "zoom": 12,
                    "opacity": 0.5
                },
                {
                    "zoom": 13,
                    "opacity": 0.5
                },
                {
                    "zoom": 14,
                    "opacity": 0.5
                },
                {
                    "zoom": 15,
                    "opacity": 0.5
                },
                {
                    "zoom": 16,
                    "opacity": 0.5
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": {
                "any": "urban_area",
                "none": [
                    "residential",
                    "industrial",
                    "cemetery",
                    "park",
                    "medical",
                    "sports_ground",
                    "beach",
                    "construction_site"
                ]
            },
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 1,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 2,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 3,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 4,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 5,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 6,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 7,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 8,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 9,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 10,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 11,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 12,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 13,
                    "color": "#d6d9dc",
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "color": "#dddfe2",
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "color": "#e4e6e8",
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "color": "#ebeced",
                    "opacity": 0.67
                },
                {
                    "zoom": 17,
                    "color": "#f2f3f3",
                    "opacity": 0.33
                },
                {
                    "zoom": 18,
                    "color": "#f2f3f3",
                    "opacity": 0
                },
                {
                    "zoom": 19,
                    "color": "#f2f3f3",
                    "opacity": 0
                },
                {
                    "zoom": 20,
                    "color": "#f2f3f3",
                    "opacity": 0
                },
                {
                    "zoom": 21,
                    "color": "#f2f3f3",
                    "opacity": 0
                }
            ]
        },
        {
            "tags": "poi",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "poi",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "poi",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "outdoor",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "outdoor",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "outdoor",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "park",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "park",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "park",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "cemetery",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "cemetery",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "cemetery",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "beach",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "beach",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "beach",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "medical",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "medical",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "medical",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "shopping",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "shopping",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "shopping",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "commercial_services",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "commercial_services",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "commercial_services",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "food_and_drink",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "food_and_drink",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "food_and_drink",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "road",
            "elements": "label.icon",
            "types": "point",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                },
                {
                    "tertiary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "road",
            "elements": "label.text.fill",
            "types": "point",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "tags": "entrance",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "locality",
            "elements": "label.icon",
            "stylers": [
                {
                    "color": "#9da6af"
                },
                {
                    "secondary-color": "#ffffff"
                }
            ]
        },
        {
            "tags": "country",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "opacity": 0.8
                },
                {
                    "color": "#8f969e"
                }
            ]
        },
        {
            "tags": "country",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "region",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#8f969e"
                },
                {
                    "opacity": 0.8
                }
            ]
        },
        {
            "tags": "region",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "district",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#8f969e"
                },
                {
                    "opacity": 0.8
                }
            ]
        },
        {
            "tags": "district",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": {
                "any": "admin",
                "none": [
                    "country",
                    "region",
                    "locality",
                    "district",
                    "address"
                ]
            },
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#8f969e"
                }
            ]
        },
        {
            "tags": {
                "any": "admin",
                "none": [
                    "country",
                    "region",
                    "locality",
                    "district",
                    "address"
                ]
            },
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "locality",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#778088"
                },
                {
                    "zoom": 1,
                    "color": "#778088"
                },
                {
                    "zoom": 2,
                    "color": "#778088"
                },
                {
                    "zoom": 3,
                    "color": "#778088"
                },
                {
                    "zoom": 4,
                    "color": "#778088"
                },
                {
                    "zoom": 5,
                    "color": "#757e86"
                },
                {
                    "zoom": 6,
                    "color": "#737c83"
                },
                {
                    "zoom": 7,
                    "color": "#717a81"
                },
                {
                    "zoom": 8,
                    "color": "#6f777f"
                },
                {
                    "zoom": 9,
                    "color": "#6d757c"
                },
                {
                    "zoom": 10,
                    "color": "#6b737a"
                },
                {
                    "zoom": 11,
                    "color": "#6b737a"
                },
                {
                    "zoom": 12,
                    "color": "#6b737a"
                },
                {
                    "zoom": 13,
                    "color": "#6b737a"
                },
                {
                    "zoom": 14,
                    "color": "#6b737a"
                },
                {
                    "zoom": 15,
                    "color": "#6b737a"
                },
                {
                    "zoom": 16,
                    "color": "#6b737a"
                },
                {
                    "zoom": 17,
                    "color": "#6b737a"
                },
                {
                    "zoom": 18,
                    "color": "#6b737a"
                },
                {
                    "zoom": 19,
                    "color": "#6b737a"
                },
                {
                    "zoom": 20,
                    "color": "#6b737a"
                },
                {
                    "zoom": 21,
                    "color": "#6b737a"
                }
            ]
        },
        {
            "tags": "locality",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "road",
            "elements": "label.text.fill",
            "types": "polyline",
            "stylers": [
                {
                    "color": "#778088"
                }
            ]
        },
        {
            "tags": "road",
            "elements": "label.text.outline",
            "types": "polyline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "road",
            "elements": "geometry.fill.pattern",
            "types": "polyline",
            "stylers": [
                {
                    "scale": 1
                },
                {
                    "color": "#adb3b8"
                }
            ]
        },
        {
            "tags": "road",
            "elements": "label.text.fill",
            "types": "point",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "tags": "structure",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#5f666d"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "structure",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "entrance",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#5f666d"
                },
                {
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "entrance",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "address",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#5f666d"
                },
                {
                    "zoom": 0,
                    "opacity": 0.9
                },
                {
                    "zoom": 1,
                    "opacity": 0.9
                },
                {
                    "zoom": 2,
                    "opacity": 0.9
                },
                {
                    "zoom": 3,
                    "opacity": 0.9
                },
                {
                    "zoom": 4,
                    "opacity": 0.9
                },
                {
                    "zoom": 5,
                    "opacity": 0.9
                },
                {
                    "zoom": 6,
                    "opacity": 0.9
                },
                {
                    "zoom": 7,
                    "opacity": 0.9
                },
                {
                    "zoom": 8,
                    "opacity": 0.9
                },
                {
                    "zoom": 9,
                    "opacity": 0.9
                },
                {
                    "zoom": 10,
                    "opacity": 0.9
                },
                {
                    "zoom": 11,
                    "opacity": 0.9
                },
                {
                    "zoom": 12,
                    "opacity": 0.9
                },
                {
                    "zoom": 13,
                    "opacity": 0.9
                },
                {
                    "zoom": 14,
                    "opacity": 0.9
                },
                {
                    "zoom": 15,
                    "opacity": 0.9
                },
                {
                    "zoom": 16,
                    "opacity": 0.9
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "address",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "landscape",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#8f969e",
                    "opacity": 1
                },
                {
                    "zoom": 1,
                    "color": "#8f969e",
                    "opacity": 1
                },
                {
                    "zoom": 2,
                    "color": "#8f969e",
                    "opacity": 1
                },
                {
                    "zoom": 3,
                    "color": "#8f969e",
                    "opacity": 1
                },
                {
                    "zoom": 4,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 5,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 6,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 7,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 8,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 9,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 10,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 11,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 12,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 13,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 14,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 15,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 16,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 17,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 18,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 19,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 20,
                    "color": "#5f666d",
                    "opacity": 0.5
                },
                {
                    "zoom": 21,
                    "color": "#5f666d",
                    "opacity": 0.5
                }
            ]
        },
        {
            "tags": "landscape",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "opacity": 0.5
                },
                {
                    "zoom": 1,
                    "opacity": 0.5
                },
                {
                    "zoom": 2,
                    "opacity": 0.5
                },
                {
                    "zoom": 3,
                    "opacity": 0.5
                },
                {
                    "zoom": 4,
                    "opacity": 0
                },
                {
                    "zoom": 5,
                    "opacity": 0
                },
                {
                    "zoom": 6,
                    "opacity": 0
                },
                {
                    "zoom": 7,
                    "opacity": 0
                },
                {
                    "zoom": 8,
                    "opacity": 0
                },
                {
                    "zoom": 9,
                    "opacity": 0
                },
                {
                    "zoom": 10,
                    "opacity": 0
                },
                {
                    "zoom": 11,
                    "opacity": 0
                },
                {
                    "zoom": 12,
                    "opacity": 0
                },
                {
                    "zoom": 13,
                    "opacity": 0
                },
                {
                    "zoom": 14,
                    "opacity": 0
                },
                {
                    "zoom": 15,
                    "opacity": 0
                },
                {
                    "zoom": 16,
                    "opacity": 0
                },
                {
                    "zoom": 17,
                    "opacity": 0
                },
                {
                    "zoom": 18,
                    "opacity": 0
                },
                {
                    "zoom": 19,
                    "opacity": 0
                },
                {
                    "zoom": 20,
                    "opacity": 0
                },
                {
                    "zoom": 21,
                    "opacity": 0
                }
            ]
        },
        {
            "tags": "water",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#5e6871"
                },
                {
                    "opacity": 0.8
                }
            ]
        },
        {
            "tags": "water",
            "elements": "label.text.outline",
            "types": "polyline",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "opacity": 0.2
                }
            ]
        },
        {
            "tags": {
                "any": "road_1",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 3.3
                },
                {
                    "zoom": 7,
                    "scale": 3.55
                },
                {
                    "zoom": 8,
                    "scale": 3.92
                },
                {
                    "zoom": 9,
                    "scale": 4.44
                },
                {
                    "zoom": 10,
                    "scale": 4.01
                },
                {
                    "zoom": 11,
                    "scale": 3.39
                },
                {
                    "zoom": 12,
                    "scale": 2.94
                },
                {
                    "zoom": 13,
                    "scale": 2.53
                },
                {
                    "zoom": 14,
                    "scale": 2.26
                },
                {
                    "zoom": 15,
                    "scale": 2.11
                },
                {
                    "zoom": 16,
                    "scale": 2.07
                },
                {
                    "zoom": 17,
                    "scale": 1.64
                },
                {
                    "zoom": 18,
                    "scale": 1.35
                },
                {
                    "zoom": 19,
                    "scale": 1.16
                },
                {
                    "zoom": 20,
                    "scale": 1.05
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": {
                "any": "road_1"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 1
                },
                {
                    "zoom": 1,
                    "scale": 1
                },
                {
                    "zoom": 2,
                    "scale": 1
                },
                {
                    "zoom": 3,
                    "scale": 1
                },
                {
                    "zoom": 4,
                    "scale": 1
                },
                {
                    "zoom": 5,
                    "scale": 1
                },
                {
                    "zoom": 6,
                    "scale": 2.18
                },
                {
                    "zoom": 7,
                    "scale": 2.18
                },
                {
                    "zoom": 8,
                    "scale": 2.25
                },
                {
                    "zoom": 9,
                    "scale": 2.4
                },
                {
                    "zoom": 10,
                    "scale": 2.4
                },
                {
                    "zoom": 11,
                    "scale": 2.26
                },
                {
                    "zoom": 12,
                    "scale": 2.15
                },
                {
                    "zoom": 13,
                    "scale": 2
                },
                {
                    "zoom": 14,
                    "scale": 1.9
                },
                {
                    "zoom": 15,
                    "scale": 1.86
                },
                {
                    "zoom": 16,
                    "scale": 1.88
                },
                {
                    "zoom": 17,
                    "scale": 1.53
                },
                {
                    "zoom": 18,
                    "scale": 1.28
                },
                {
                    "zoom": 19,
                    "scale": 1.11
                },
                {
                    "zoom": 20,
                    "scale": 1.01
                },
                {
                    "zoom": 21,
                    "scale": 0.96
                }
            ]
        },
        {
            "tags": {
                "any": "road_2",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 3.3
                },
                {
                    "zoom": 7,
                    "scale": 3.55
                },
                {
                    "zoom": 8,
                    "scale": 3.92
                },
                {
                    "zoom": 9,
                    "scale": 4.44
                },
                {
                    "zoom": 10,
                    "scale": 4.01
                },
                {
                    "zoom": 11,
                    "scale": 3.39
                },
                {
                    "zoom": 12,
                    "scale": 2.94
                },
                {
                    "zoom": 13,
                    "scale": 2.53
                },
                {
                    "zoom": 14,
                    "scale": 2.26
                },
                {
                    "zoom": 15,
                    "scale": 2.11
                },
                {
                    "zoom": 16,
                    "scale": 2.07
                },
                {
                    "zoom": 17,
                    "scale": 1.64
                },
                {
                    "zoom": 18,
                    "scale": 1.35
                },
                {
                    "zoom": 19,
                    "scale": 1.16
                },
                {
                    "zoom": 20,
                    "scale": 1.05
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": {
                "any": "road_2"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 1
                },
                {
                    "zoom": 1,
                    "scale": 1
                },
                {
                    "zoom": 2,
                    "scale": 1
                },
                {
                    "zoom": 3,
                    "scale": 1
                },
                {
                    "zoom": 4,
                    "scale": 1
                },
                {
                    "zoom": 5,
                    "scale": 1
                },
                {
                    "zoom": 6,
                    "scale": 2.18
                },
                {
                    "zoom": 7,
                    "scale": 2.18
                },
                {
                    "zoom": 8,
                    "scale": 2.25
                },
                {
                    "zoom": 9,
                    "scale": 2.4
                },
                {
                    "zoom": 10,
                    "scale": 2.4
                },
                {
                    "zoom": 11,
                    "scale": 2.26
                },
                {
                    "zoom": 12,
                    "scale": 2.15
                },
                {
                    "zoom": 13,
                    "scale": 2
                },
                {
                    "zoom": 14,
                    "scale": 1.9
                },
                {
                    "zoom": 15,
                    "scale": 1.86
                },
                {
                    "zoom": 16,
                    "scale": 1.88
                },
                {
                    "zoom": 17,
                    "scale": 1.53
                },
                {
                    "zoom": 18,
                    "scale": 1.28
                },
                {
                    "zoom": 19,
                    "scale": 1.11
                },
                {
                    "zoom": 20,
                    "scale": 1.01
                },
                {
                    "zoom": 21,
                    "scale": 0.96
                }
            ]
        },
        {
            "tags": {
                "any": "road_3",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 0
                },
                {
                    "zoom": 7,
                    "scale": 0
                },
                {
                    "zoom": 8,
                    "scale": 0
                },
                {
                    "zoom": 9,
                    "scale": 2.79
                },
                {
                    "zoom": 10,
                    "scale": 2.91
                },
                {
                    "zoom": 11,
                    "scale": 1.86
                },
                {
                    "zoom": 12,
                    "scale": 1.86
                },
                {
                    "zoom": 13,
                    "scale": 1.54
                },
                {
                    "zoom": 14,
                    "scale": 1.32
                },
                {
                    "zoom": 15,
                    "scale": 1.2
                },
                {
                    "zoom": 16,
                    "scale": 1.15
                },
                {
                    "zoom": 17,
                    "scale": 1.01
                },
                {
                    "zoom": 18,
                    "scale": 0.93
                },
                {
                    "zoom": 19,
                    "scale": 0.91
                },
                {
                    "zoom": 20,
                    "scale": 0.93
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": {
                "any": "road_3"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 1.14
                },
                {
                    "zoom": 1,
                    "scale": 1.14
                },
                {
                    "zoom": 2,
                    "scale": 1.14
                },
                {
                    "zoom": 3,
                    "scale": 1.14
                },
                {
                    "zoom": 4,
                    "scale": 1.14
                },
                {
                    "zoom": 5,
                    "scale": 1.14
                },
                {
                    "zoom": 6,
                    "scale": 1.14
                },
                {
                    "zoom": 7,
                    "scale": 1.14
                },
                {
                    "zoom": 8,
                    "scale": 0.92
                },
                {
                    "zoom": 9,
                    "scale": 3.01
                },
                {
                    "zoom": 10,
                    "scale": 1.95
                },
                {
                    "zoom": 11,
                    "scale": 1.46
                },
                {
                    "zoom": 12,
                    "scale": 1.52
                },
                {
                    "zoom": 13,
                    "scale": 1.35
                },
                {
                    "zoom": 14,
                    "scale": 1.22
                },
                {
                    "zoom": 15,
                    "scale": 1.14
                },
                {
                    "zoom": 16,
                    "scale": 1.11
                },
                {
                    "zoom": 17,
                    "scale": 0.98
                },
                {
                    "zoom": 18,
                    "scale": 0.9
                },
                {
                    "zoom": 19,
                    "scale": 0.88
                },
                {
                    "zoom": 20,
                    "scale": 0.9
                },
                {
                    "zoom": 21,
                    "scale": 0.96
                }
            ]
        },
        {
            "tags": {
                "any": "road_4",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 0
                },
                {
                    "zoom": 7,
                    "scale": 0
                },
                {
                    "zoom": 8,
                    "scale": 0
                },
                {
                    "zoom": 9,
                    "scale": 0
                },
                {
                    "zoom": 10,
                    "scale": 1.88
                },
                {
                    "zoom": 11,
                    "scale": 1.4
                },
                {
                    "zoom": 12,
                    "scale": 1.57
                },
                {
                    "zoom": 13,
                    "scale": 1.32
                },
                {
                    "zoom": 14,
                    "scale": 1.16
                },
                {
                    "zoom": 15,
                    "scale": 1.07
                },
                {
                    "zoom": 16,
                    "scale": 1.28
                },
                {
                    "zoom": 17,
                    "scale": 1.1
                },
                {
                    "zoom": 18,
                    "scale": 0.99
                },
                {
                    "zoom": 19,
                    "scale": 0.94
                },
                {
                    "zoom": 20,
                    "scale": 0.95
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": {
                "any": "road_4"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 1
                },
                {
                    "zoom": 1,
                    "scale": 1
                },
                {
                    "zoom": 2,
                    "scale": 1
                },
                {
                    "zoom": 3,
                    "scale": 1
                },
                {
                    "zoom": 4,
                    "scale": 1
                },
                {
                    "zoom": 5,
                    "scale": 1
                },
                {
                    "zoom": 6,
                    "scale": 1
                },
                {
                    "zoom": 7,
                    "scale": 1
                },
                {
                    "zoom": 8,
                    "scale": 1
                },
                {
                    "zoom": 9,
                    "scale": 0.8
                },
                {
                    "zoom": 10,
                    "scale": 1.36
                },
                {
                    "zoom": 11,
                    "scale": 1.15
                },
                {
                    "zoom": 12,
                    "scale": 1.3
                },
                {
                    "zoom": 13,
                    "scale": 1.17
                },
                {
                    "zoom": 14,
                    "scale": 1.08
                },
                {
                    "zoom": 15,
                    "scale": 1.03
                },
                {
                    "zoom": 16,
                    "scale": 1.21
                },
                {
                    "zoom": 17,
                    "scale": 1.05
                },
                {
                    "zoom": 18,
                    "scale": 0.96
                },
                {
                    "zoom": 19,
                    "scale": 0.91
                },
                {
                    "zoom": 20,
                    "scale": 0.91
                },
                {
                    "zoom": 21,
                    "scale": 0.96
                }
            ]
        },
        {
            "tags": {
                "any": "road_5",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 0
                },
                {
                    "zoom": 7,
                    "scale": 0
                },
                {
                    "zoom": 8,
                    "scale": 0
                },
                {
                    "zoom": 9,
                    "scale": 0
                },
                {
                    "zoom": 10,
                    "scale": 0
                },
                {
                    "zoom": 11,
                    "scale": 0
                },
                {
                    "zoom": 12,
                    "scale": 1.39
                },
                {
                    "zoom": 13,
                    "scale": 1.05
                },
                {
                    "zoom": 14,
                    "scale": 0.9
                },
                {
                    "zoom": 15,
                    "scale": 1.05
                },
                {
                    "zoom": 16,
                    "scale": 1.22
                },
                {
                    "zoom": 17,
                    "scale": 1.04
                },
                {
                    "zoom": 18,
                    "scale": 0.94
                },
                {
                    "zoom": 19,
                    "scale": 0.91
                },
                {
                    "zoom": 20,
                    "scale": 0.93
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": {
                "any": "road_5"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 1
                },
                {
                    "zoom": 1,
                    "scale": 1
                },
                {
                    "zoom": 2,
                    "scale": 1
                },
                {
                    "zoom": 3,
                    "scale": 1
                },
                {
                    "zoom": 4,
                    "scale": 1
                },
                {
                    "zoom": 5,
                    "scale": 1
                },
                {
                    "zoom": 6,
                    "scale": 1
                },
                {
                    "zoom": 7,
                    "scale": 1
                },
                {
                    "zoom": 8,
                    "scale": 1
                },
                {
                    "zoom": 9,
                    "scale": 1
                },
                {
                    "zoom": 10,
                    "scale": 1
                },
                {
                    "zoom": 11,
                    "scale": 0.44
                },
                {
                    "zoom": 12,
                    "scale": 1.15
                },
                {
                    "zoom": 13,
                    "scale": 0.97
                },
                {
                    "zoom": 14,
                    "scale": 0.87
                },
                {
                    "zoom": 15,
                    "scale": 1.01
                },
                {
                    "zoom": 16,
                    "scale": 1.16
                },
                {
                    "zoom": 17,
                    "scale": 1
                },
                {
                    "zoom": 18,
                    "scale": 0.91
                },
                {
                    "zoom": 19,
                    "scale": 0.88
                },
                {
                    "zoom": 20,
                    "scale": 0.89
                },
                {
                    "zoom": 21,
                    "scale": 0.96
                }
            ]
        },
        {
            "tags": {
                "any": "road_6",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 0
                },
                {
                    "zoom": 7,
                    "scale": 0
                },
                {
                    "zoom": 8,
                    "scale": 0
                },
                {
                    "zoom": 9,
                    "scale": 0
                },
                {
                    "zoom": 10,
                    "scale": 0
                },
                {
                    "zoom": 11,
                    "scale": 0
                },
                {
                    "zoom": 12,
                    "scale": 0
                },
                {
                    "zoom": 13,
                    "scale": 2.5
                },
                {
                    "zoom": 14,
                    "scale": 1.41
                },
                {
                    "zoom": 15,
                    "scale": 1.39
                },
                {
                    "zoom": 16,
                    "scale": 1.45
                },
                {
                    "zoom": 17,
                    "scale": 1.16
                },
                {
                    "zoom": 18,
                    "scale": 1
                },
                {
                    "zoom": 19,
                    "scale": 0.94
                },
                {
                    "zoom": 20,
                    "scale": 0.94
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": {
                "any": "road_6"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 1
                },
                {
                    "zoom": 1,
                    "scale": 1
                },
                {
                    "zoom": 2,
                    "scale": 1
                },
                {
                    "zoom": 3,
                    "scale": 1
                },
                {
                    "zoom": 4,
                    "scale": 1
                },
                {
                    "zoom": 5,
                    "scale": 1
                },
                {
                    "zoom": 6,
                    "scale": 1
                },
                {
                    "zoom": 7,
                    "scale": 1
                },
                {
                    "zoom": 8,
                    "scale": 1
                },
                {
                    "zoom": 9,
                    "scale": 1
                },
                {
                    "zoom": 10,
                    "scale": 1
                },
                {
                    "zoom": 11,
                    "scale": 1
                },
                {
                    "zoom": 12,
                    "scale": 1
                },
                {
                    "zoom": 13,
                    "scale": 1.65
                },
                {
                    "zoom": 14,
                    "scale": 1.21
                },
                {
                    "zoom": 15,
                    "scale": 1.26
                },
                {
                    "zoom": 16,
                    "scale": 1.35
                },
                {
                    "zoom": 17,
                    "scale": 1.1
                },
                {
                    "zoom": 18,
                    "scale": 0.97
                },
                {
                    "zoom": 19,
                    "scale": 0.91
                },
                {
                    "zoom": 20,
                    "scale": 0.91
                },
                {
                    "zoom": 21,
                    "scale": 0.96
                }
            ]
        },
        {
            "tags": {
                "any": "road_7",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 0
                },
                {
                    "zoom": 7,
                    "scale": 0
                },
                {
                    "zoom": 8,
                    "scale": 0
                },
                {
                    "zoom": 9,
                    "scale": 0
                },
                {
                    "zoom": 10,
                    "scale": 0
                },
                {
                    "zoom": 11,
                    "scale": 0
                },
                {
                    "zoom": 12,
                    "scale": 0
                },
                {
                    "zoom": 13,
                    "scale": 0
                },
                {
                    "zoom": 14,
                    "scale": 1
                },
                {
                    "zoom": 15,
                    "scale": 0.87
                },
                {
                    "zoom": 16,
                    "scale": 0.97
                },
                {
                    "zoom": 17,
                    "scale": 0.89
                },
                {
                    "zoom": 18,
                    "scale": 0.86
                },
                {
                    "zoom": 19,
                    "scale": 0.88
                },
                {
                    "zoom": 20,
                    "scale": 0.92
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": {
                "any": "road_7"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 1
                },
                {
                    "zoom": 1,
                    "scale": 1
                },
                {
                    "zoom": 2,
                    "scale": 1
                },
                {
                    "zoom": 3,
                    "scale": 1
                },
                {
                    "zoom": 4,
                    "scale": 1
                },
                {
                    "zoom": 5,
                    "scale": 1
                },
                {
                    "zoom": 6,
                    "scale": 1
                },
                {
                    "zoom": 7,
                    "scale": 1
                },
                {
                    "zoom": 8,
                    "scale": 1
                },
                {
                    "zoom": 9,
                    "scale": 1
                },
                {
                    "zoom": 10,
                    "scale": 1
                },
                {
                    "zoom": 11,
                    "scale": 1
                },
                {
                    "zoom": 12,
                    "scale": 1
                },
                {
                    "zoom": 13,
                    "scale": 1
                },
                {
                    "zoom": 14,
                    "scale": 0.93
                },
                {
                    "zoom": 15,
                    "scale": 0.85
                },
                {
                    "zoom": 16,
                    "scale": 0.94
                },
                {
                    "zoom": 17,
                    "scale": 0.86
                },
                {
                    "zoom": 18,
                    "scale": 0.83
                },
                {
                    "zoom": 19,
                    "scale": 0.84
                },
                {
                    "zoom": 20,
                    "scale": 0.88
                },
                {
                    "zoom": 21,
                    "scale": 0.95
                }
            ]
        },
        {
            "tags": {
                "any": "road_minor",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 0
                },
                {
                    "zoom": 7,
                    "scale": 0
                },
                {
                    "zoom": 8,
                    "scale": 0
                },
                {
                    "zoom": 9,
                    "scale": 0
                },
                {
                    "zoom": 10,
                    "scale": 0
                },
                {
                    "zoom": 11,
                    "scale": 0
                },
                {
                    "zoom": 12,
                    "scale": 0
                },
                {
                    "zoom": 13,
                    "scale": 0
                },
                {
                    "zoom": 14,
                    "scale": 0
                },
                {
                    "zoom": 15,
                    "scale": 0
                },
                {
                    "zoom": 16,
                    "scale": 1
                },
                {
                    "zoom": 17,
                    "scale": 1
                },
                {
                    "zoom": 18,
                    "scale": 1
                },
                {
                    "zoom": 19,
                    "scale": 1
                },
                {
                    "zoom": 20,
                    "scale": 1
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": {
                "any": "road_minor"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 0.29
                },
                {
                    "zoom": 1,
                    "scale": 0.29
                },
                {
                    "zoom": 2,
                    "scale": 0.29
                },
                {
                    "zoom": 3,
                    "scale": 0.29
                },
                {
                    "zoom": 4,
                    "scale": 0.29
                },
                {
                    "zoom": 5,
                    "scale": 0.29
                },
                {
                    "zoom": 6,
                    "scale": 0.29
                },
                {
                    "zoom": 7,
                    "scale": 0.29
                },
                {
                    "zoom": 8,
                    "scale": 0.29
                },
                {
                    "zoom": 9,
                    "scale": 0.29
                },
                {
                    "zoom": 10,
                    "scale": 0.29
                },
                {
                    "zoom": 11,
                    "scale": 0.29
                },
                {
                    "zoom": 12,
                    "scale": 0.29
                },
                {
                    "zoom": 13,
                    "scale": 0.29
                },
                {
                    "zoom": 14,
                    "scale": 0.29
                },
                {
                    "zoom": 15,
                    "scale": 0.29
                },
                {
                    "zoom": 16,
                    "scale": 1
                },
                {
                    "zoom": 17,
                    "scale": 0.9
                },
                {
                    "zoom": 18,
                    "scale": 0.91
                },
                {
                    "zoom": 19,
                    "scale": 0.92
                },
                {
                    "zoom": 20,
                    "scale": 0.93
                },
                {
                    "zoom": 21,
                    "scale": 0.95
                }
            ]
        },
        {
            "tags": {
                "any": "road_unclassified",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 0
                },
                {
                    "zoom": 7,
                    "scale": 0
                },
                {
                    "zoom": 8,
                    "scale": 0
                },
                {
                    "zoom": 9,
                    "scale": 0
                },
                {
                    "zoom": 10,
                    "scale": 0
                },
                {
                    "zoom": 11,
                    "scale": 0
                },
                {
                    "zoom": 12,
                    "scale": 0
                },
                {
                    "zoom": 13,
                    "scale": 0
                },
                {
                    "zoom": 14,
                    "scale": 0
                },
                {
                    "zoom": 15,
                    "scale": 0
                },
                {
                    "zoom": 16,
                    "scale": 1
                },
                {
                    "zoom": 17,
                    "scale": 1
                },
                {
                    "zoom": 18,
                    "scale": 1
                },
                {
                    "zoom": 19,
                    "scale": 1
                },
                {
                    "zoom": 20,
                    "scale": 1
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": {
                "any": "road_unclassified"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 0.29
                },
                {
                    "zoom": 1,
                    "scale": 0.29
                },
                {
                    "zoom": 2,
                    "scale": 0.29
                },
                {
                    "zoom": 3,
                    "scale": 0.29
                },
                {
                    "zoom": 4,
                    "scale": 0.29
                },
                {
                    "zoom": 5,
                    "scale": 0.29
                },
                {
                    "zoom": 6,
                    "scale": 0.29
                },
                {
                    "zoom": 7,
                    "scale": 0.29
                },
                {
                    "zoom": 8,
                    "scale": 0.29
                },
                {
                    "zoom": 9,
                    "scale": 0.29
                },
                {
                    "zoom": 10,
                    "scale": 0.29
                },
                {
                    "zoom": 11,
                    "scale": 0.29
                },
                {
                    "zoom": 12,
                    "scale": 0.29
                },
                {
                    "zoom": 13,
                    "scale": 0.29
                },
                {
                    "zoom": 14,
                    "scale": 0.29
                },
                {
                    "zoom": 15,
                    "scale": 0.29
                },
                {
                    "zoom": 16,
                    "scale": 1
                },
                {
                    "zoom": 17,
                    "scale": 0.9
                },
                {
                    "zoom": 18,
                    "scale": 0.91
                },
                {
                    "zoom": 19,
                    "scale": 0.92
                },
                {
                    "zoom": 20,
                    "scale": 0.93
                },
                {
                    "zoom": 21,
                    "scale": 0.95
                }
            ]
        },
        {
            "tags": {
                "all": "is_tunnel",
                "none": "path"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 1,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 2,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 3,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 4,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 5,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 6,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 7,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 8,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 9,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 10,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 11,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 12,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 13,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 14,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 15,
                    "color": "#e6e8ea"
                },
                {
                    "zoom": 16,
                    "color": "#e7e9eb"
                },
                {
                    "zoom": 17,
                    "color": "#e8eaeb"
                },
                {
                    "zoom": 18,
                    "color": "#e9eaec"
                },
                {
                    "zoom": 19,
                    "color": "#eaebed"
                },
                {
                    "zoom": 20,
                    "color": "#ebeced"
                },
                {
                    "zoom": 21,
                    "color": "#ecedee"
                }
            ]
        },
        {
            "tags": {
                "all": "path",
                "none": "is_tunnel"
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#c8ccd0"
                }
            ]
        },
        {
            "tags": {
                "all": "path",
                "none": "is_tunnel"
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "opacity": 0.7
                },
                {
                    "zoom": 0,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 1,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 2,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 3,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 4,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 5,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 6,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 7,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 8,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 9,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 10,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 11,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 12,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 13,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 14,
                    "color": "#e6e8e9"
                },
                {
                    "zoom": 15,
                    "color": "#ecedee"
                },
                {
                    "zoom": 16,
                    "color": "#edeeef"
                },
                {
                    "zoom": 17,
                    "color": "#eeeff0"
                },
                {
                    "zoom": 18,
                    "color": "#eeeff0"
                },
                {
                    "zoom": 19,
                    "color": "#eff0f1"
                },
                {
                    "zoom": 20,
                    "color": "#f0f1f2"
                },
                {
                    "zoom": 21,
                    "color": "#f1f2f3"
                }
            ]
        },
        {
            "tags": "road_construction",
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "tags": "road_construction",
            "elements": "geometry.outline",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 1,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 2,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 3,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 4,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 5,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 6,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 7,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 8,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 9,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 10,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 11,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 12,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 13,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 14,
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 15,
                    "color": "#e4e6e8"
                },
                {
                    "zoom": 16,
                    "color": "#e8eaec"
                },
                {
                    "zoom": 17,
                    "color": "#edeef0"
                },
                {
                    "zoom": 18,
                    "color": "#f1f2f3"
                },
                {
                    "zoom": 19,
                    "color": "#f6f7f7"
                },
                {
                    "zoom": 20,
                    "color": "#fafbfb"
                },
                {
                    "zoom": 21,
                    "color": "#ffffff"
                }
            ]
        },
        {
            "tags": {
                "any": "ferry"
            },
            "stylers": [
                {
                    "color": "#919ba4"
                }
            ]
        },
        {
            "tags": "transit_location",
            "elements": "label.icon",
            "stylers": [
                {
                    "saturation": -1
                },
                {
                    "zoom": 0,
                    "opacity": 0
                },
                {
                    "zoom": 1,
                    "opacity": 0
                },
                {
                    "zoom": 2,
                    "opacity": 0
                },
                {
                    "zoom": 3,
                    "opacity": 0
                },
                {
                    "zoom": 4,
                    "opacity": 0
                },
                {
                    "zoom": 5,
                    "opacity": 0
                },
                {
                    "zoom": 6,
                    "opacity": 0
                },
                {
                    "zoom": 7,
                    "opacity": 0
                },
                {
                    "zoom": 8,
                    "opacity": 0
                },
                {
                    "zoom": 9,
                    "opacity": 0
                },
                {
                    "zoom": 10,
                    "opacity": 0
                },
                {
                    "zoom": 11,
                    "opacity": 0
                },
                {
                    "zoom": 12,
                    "opacity": 0
                },
                {
                    "zoom": 13,
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "transit_location",
            "elements": "label.text",
            "stylers": [
                {
                    "zoom": 0,
                    "opacity": 0
                },
                {
                    "zoom": 1,
                    "opacity": 0
                },
                {
                    "zoom": 2,
                    "opacity": 0
                },
                {
                    "zoom": 3,
                    "opacity": 0
                },
                {
                    "zoom": 4,
                    "opacity": 0
                },
                {
                    "zoom": 5,
                    "opacity": 0
                },
                {
                    "zoom": 6,
                    "opacity": 0
                },
                {
                    "zoom": 7,
                    "opacity": 0
                },
                {
                    "zoom": 8,
                    "opacity": 0
                },
                {
                    "zoom": 9,
                    "opacity": 0
                },
                {
                    "zoom": 10,
                    "opacity": 0
                },
                {
                    "zoom": 11,
                    "opacity": 0
                },
                {
                    "zoom": 12,
                    "opacity": 0
                },
                {
                    "zoom": 13,
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "transit_location",
            "elements": "label.text.fill",
            "stylers": [
                {
                    "color": "#6c8993"
                }
            ]
        },
        {
            "tags": "transit_location",
            "elements": "label.text.outline",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "tags": "transit_schema",
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#6c8993"
                },
                {
                    "scale": 0.7
                },
                {
                    "zoom": 0,
                    "opacity": 0.6
                },
                {
                    "zoom": 1,
                    "opacity": 0.6
                },
                {
                    "zoom": 2,
                    "opacity": 0.6
                },
                {
                    "zoom": 3,
                    "opacity": 0.6
                },
                {
                    "zoom": 4,
                    "opacity": 0.6
                },
                {
                    "zoom": 5,
                    "opacity": 0.6
                },
                {
                    "zoom": 6,
                    "opacity": 0.6
                },
                {
                    "zoom": 7,
                    "opacity": 0.6
                },
                {
                    "zoom": 8,
                    "opacity": 0.6
                },
                {
                    "zoom": 9,
                    "opacity": 0.6
                },
                {
                    "zoom": 10,
                    "opacity": 0.6
                },
                {
                    "zoom": 11,
                    "opacity": 0.6
                },
                {
                    "zoom": 12,
                    "opacity": 0.6
                },
                {
                    "zoom": 13,
                    "opacity": 0.6
                },
                {
                    "zoom": 14,
                    "opacity": 0.6
                },
                {
                    "zoom": 15,
                    "opacity": 0.5
                },
                {
                    "zoom": 16,
                    "opacity": 0.4
                },
                {
                    "zoom": 17,
                    "opacity": 0.4
                },
                {
                    "zoom": 18,
                    "opacity": 0.4
                },
                {
                    "zoom": 19,
                    "opacity": 0.4
                },
                {
                    "zoom": 20,
                    "opacity": 0.4
                },
                {
                    "zoom": 21,
                    "opacity": 0.4
                }
            ]
        },
        {
            "tags": "transit_schema",
            "elements": "geometry.outline",
            "stylers": [
                {
                    "opacity": 0
                }
            ]
        },
        {
            "tags": "transit_line",
            "elements": "geometry.fill.pattern",
            "stylers": [
                {
                    "color": "#949c9e"
                },
                {
                    "zoom": 0,
                    "opacity": 0
                },
                {
                    "zoom": 1,
                    "opacity": 0
                },
                {
                    "zoom": 2,
                    "opacity": 0
                },
                {
                    "zoom": 3,
                    "opacity": 0
                },
                {
                    "zoom": 4,
                    "opacity": 0
                },
                {
                    "zoom": 5,
                    "opacity": 0
                },
                {
                    "zoom": 6,
                    "opacity": 0
                },
                {
                    "zoom": 7,
                    "opacity": 0
                },
                {
                    "zoom": 8,
                    "opacity": 0
                },
                {
                    "zoom": 9,
                    "opacity": 0
                },
                {
                    "zoom": 10,
                    "opacity": 0
                },
                {
                    "zoom": 11,
                    "opacity": 0
                },
                {
                    "zoom": 12,
                    "opacity": 0
                },
                {
                    "zoom": 13,
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "transit_line",
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#949c9e"
                },
                {
                    "scale": 0.4
                },
                {
                    "zoom": 0,
                    "opacity": 0
                },
                {
                    "zoom": 1,
                    "opacity": 0
                },
                {
                    "zoom": 2,
                    "opacity": 0
                },
                {
                    "zoom": 3,
                    "opacity": 0
                },
                {
                    "zoom": 4,
                    "opacity": 0
                },
                {
                    "zoom": 5,
                    "opacity": 0
                },
                {
                    "zoom": 6,
                    "opacity": 0
                },
                {
                    "zoom": 7,
                    "opacity": 0
                },
                {
                    "zoom": 8,
                    "opacity": 0
                },
                {
                    "zoom": 9,
                    "opacity": 0
                },
                {
                    "zoom": 10,
                    "opacity": 0
                },
                {
                    "zoom": 11,
                    "opacity": 0
                },
                {
                    "zoom": 12,
                    "opacity": 0
                },
                {
                    "zoom": 13,
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "water",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#adb4bb"
                },
                {
                    "zoom": 1,
                    "color": "#adb4bb"
                },
                {
                    "zoom": 2,
                    "color": "#adb4bb"
                },
                {
                    "zoom": 3,
                    "color": "#adb4bb"
                },
                {
                    "zoom": 4,
                    "color": "#adb4bb"
                },
                {
                    "zoom": 5,
                    "color": "#adb4bb"
                },
                {
                    "zoom": 6,
                    "color": "#adb4bb"
                },
                {
                    "zoom": 7,
                    "color": "#adb4bb"
                },
                {
                    "zoom": 8,
                    "color": "#afb6bd"
                },
                {
                    "zoom": 9,
                    "color": "#b1b7be"
                },
                {
                    "zoom": 10,
                    "color": "#b3b9c0"
                },
                {
                    "zoom": 11,
                    "color": "#b4bac1"
                },
                {
                    "zoom": 12,
                    "color": "#b4bbc1"
                },
                {
                    "zoom": 13,
                    "color": "#b5bcc2"
                },
                {
                    "zoom": 14,
                    "color": "#b6bdc3"
                },
                {
                    "zoom": 15,
                    "color": "#b8bec4"
                },
                {
                    "zoom": 16,
                    "color": "#b9c0c5"
                },
                {
                    "zoom": 17,
                    "color": "#bbc1c6"
                },
                {
                    "zoom": 18,
                    "color": "#bcc2c8"
                },
                {
                    "zoom": 19,
                    "color": "#bec3c9"
                },
                {
                    "zoom": 20,
                    "color": "#bfc5ca"
                },
                {
                    "zoom": 21,
                    "color": "#c1c6cb"
                }
            ]
        },
        {
            "tags": "water",
            "elements": "geometry",
            "types": "polyline",
            "stylers": [
                {
                    "zoom": 0,
                    "opacity": 0.4
                },
                {
                    "zoom": 1,
                    "opacity": 0.4
                },
                {
                    "zoom": 2,
                    "opacity": 0.4
                },
                {
                    "zoom": 3,
                    "opacity": 0.4
                },
                {
                    "zoom": 4,
                    "opacity": 0.6
                },
                {
                    "zoom": 5,
                    "opacity": 0.8
                },
                {
                    "zoom": 6,
                    "opacity": 1
                },
                {
                    "zoom": 7,
                    "opacity": 1
                },
                {
                    "zoom": 8,
                    "opacity": 1
                },
                {
                    "zoom": 9,
                    "opacity": 1
                },
                {
                    "zoom": 10,
                    "opacity": 1
                },
                {
                    "zoom": 11,
                    "opacity": 1
                },
                {
                    "zoom": 12,
                    "opacity": 1
                },
                {
                    "zoom": 13,
                    "opacity": 1
                },
                {
                    "zoom": 14,
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "opacity": 1
                }
            ]
        },
        {
            "tags": "bathymetry",
            "elements": "geometry",
            "stylers": [
                {
                    "hue": "#adb4bb"
                }
            ]
        },
        {
            "tags": {
                "any": [
                    "industrial",
                    "construction_site"
                ]
            },
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 1,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 2,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 3,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 4,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 5,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 6,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 7,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 8,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 9,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 10,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 11,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 12,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 13,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 14,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 15,
                    "color": "#e7e8ea"
                },
                {
                    "zoom": 16,
                    "color": "#e8e9eb"
                },
                {
                    "zoom": 17,
                    "color": "#e9eaeb"
                },
                {
                    "zoom": 18,
                    "color": "#e9eaec"
                },
                {
                    "zoom": 19,
                    "color": "#eaebed"
                },
                {
                    "zoom": 20,
                    "color": "#ebeced"
                },
                {
                    "zoom": 21,
                    "color": "#ecedee"
                }
            ]
        },
        {
            "tags": {
                "any": "transit",
                "none": [
                    "transit_location",
                    "transit_line",
                    "transit_schema",
                    "is_unclassified_transit"
                ]
            },
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 1,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 2,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 3,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 4,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 5,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 6,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 7,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 8,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 9,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 10,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 11,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 12,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 13,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 14,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 15,
                    "color": "#e7e8ea"
                },
                {
                    "zoom": 16,
                    "color": "#e8e9eb"
                },
                {
                    "zoom": 17,
                    "color": "#e9eaeb"
                },
                {
                    "zoom": 18,
                    "color": "#e9eaec"
                },
                {
                    "zoom": 19,
                    "color": "#eaebed"
                },
                {
                    "zoom": 20,
                    "color": "#ebeced"
                },
                {
                    "zoom": 21,
                    "color": "#ecedee"
                }
            ]
        },
        {
            "tags": "fence",
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#d1d4d6"
                },
                {
                    "zoom": 0,
                    "opacity": 0.75
                },
                {
                    "zoom": 1,
                    "opacity": 0.75
                },
                {
                    "zoom": 2,
                    "opacity": 0.75
                },
                {
                    "zoom": 3,
                    "opacity": 0.75
                },
                {
                    "zoom": 4,
                    "opacity": 0.75
                },
                {
                    "zoom": 5,
                    "opacity": 0.75
                },
                {
                    "zoom": 6,
                    "opacity": 0.75
                },
                {
                    "zoom": 7,
                    "opacity": 0.75
                },
                {
                    "zoom": 8,
                    "opacity": 0.75
                },
                {
                    "zoom": 9,
                    "opacity": 0.75
                },
                {
                    "zoom": 10,
                    "opacity": 0.75
                },
                {
                    "zoom": 11,
                    "opacity": 0.75
                },
                {
                    "zoom": 12,
                    "opacity": 0.75
                },
                {
                    "zoom": 13,
                    "opacity": 0.75
                },
                {
                    "zoom": 14,
                    "opacity": 0.75
                },
                {
                    "zoom": 15,
                    "opacity": 0.75
                },
                {
                    "zoom": 16,
                    "opacity": 0.75
                },
                {
                    "zoom": 17,
                    "opacity": 0.45
                },
                {
                    "zoom": 18,
                    "opacity": 0.45
                },
                {
                    "zoom": 19,
                    "opacity": 0.45
                },
                {
                    "zoom": 20,
                    "opacity": 0.45
                },
                {
                    "zoom": 21,
                    "opacity": 0.45
                }
            ]
        },
        {
            "tags": "medical",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 1,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 2,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 3,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 4,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 5,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 6,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 7,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 8,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 9,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 10,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 11,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 12,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 13,
                    "color": "#dcdee0"
                },
                {
                    "zoom": 14,
                    "color": "#e1e3e5"
                },
                {
                    "zoom": 15,
                    "color": "#e7e8ea"
                },
                {
                    "zoom": 16,
                    "color": "#e8e9eb"
                },
                {
                    "zoom": 17,
                    "color": "#e9eaeb"
                },
                {
                    "zoom": 18,
                    "color": "#e9eaec"
                },
                {
                    "zoom": 19,
                    "color": "#eaebed"
                },
                {
                    "zoom": 20,
                    "color": "#ebeced"
                },
                {
                    "zoom": 21,
                    "color": "#ecedee"
                }
            ]
        },
        {
            "tags": "beach",
            "elements": "geometry",
            "stylers": [
                {
                    "zoom": 0,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 1,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 2,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 3,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 4,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 5,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 6,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 7,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 8,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 9,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 10,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 11,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 12,
                    "color": "#dcdee0",
                    "opacity": 0.3
                },
                {
                    "zoom": 13,
                    "color": "#dcdee0",
                    "opacity": 0.65
                },
                {
                    "zoom": 14,
                    "color": "#e1e3e5",
                    "opacity": 1
                },
                {
                    "zoom": 15,
                    "color": "#e7e8ea",
                    "opacity": 1
                },
                {
                    "zoom": 16,
                    "color": "#e8e9eb",
                    "opacity": 1
                },
                {
                    "zoom": 17,
                    "color": "#e9eaeb",
                    "opacity": 1
                },
                {
                    "zoom": 18,
                    "color": "#e9eaec",
                    "opacity": 1
                },
                {
                    "zoom": 19,
                    "color": "#eaebed",
                    "opacity": 1
                },
                {
                    "zoom": 20,
                    "color": "#ebeced",
                    "opacity": 1
                },
                {
                    "zoom": 21,
                    "color": "#ecedee",
                    "opacity": 1
                }
            ]
        },
        {
            "tags": {
                "all": [
                    "is_tunnel",
                    "path"
                ]
            },
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#c3c7cb"
                },
                {
                    "opacity": 0.3
                }
            ]
        },
        {
            "tags": {
                "all": [
                    "is_tunnel",
                    "path"
                ]
            },
            "elements": "geometry.outline",
            "stylers": [
                {
                    "opacity": 0
                }
            ]
        },
        {
            "tags": "road_limited",
            "elements": "geometry.fill",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 0
                },
                {
                    "zoom": 1,
                    "scale": 0
                },
                {
                    "zoom": 2,
                    "scale": 0
                },
                {
                    "zoom": 3,
                    "scale": 0
                },
                {
                    "zoom": 4,
                    "scale": 0
                },
                {
                    "zoom": 5,
                    "scale": 0
                },
                {
                    "zoom": 6,
                    "scale": 0
                },
                {
                    "zoom": 7,
                    "scale": 0
                },
                {
                    "zoom": 8,
                    "scale": 0
                },
                {
                    "zoom": 9,
                    "scale": 0
                },
                {
                    "zoom": 10,
                    "scale": 0
                },
                {
                    "zoom": 11,
                    "scale": 0
                },
                {
                    "zoom": 12,
                    "scale": 0
                },
                {
                    "zoom": 13,
                    "scale": 0.1
                },
                {
                    "zoom": 14,
                    "scale": 0.2
                },
                {
                    "zoom": 15,
                    "scale": 0.3
                },
                {
                    "zoom": 16,
                    "scale": 0.5
                },
                {
                    "zoom": 17,
                    "scale": 0.6
                },
                {
                    "zoom": 18,
                    "scale": 0.7
                },
                {
                    "zoom": 19,
                    "scale": 0.88
                },
                {
                    "zoom": 20,
                    "scale": 0.92
                },
                {
                    "zoom": 21,
                    "scale": 1
                }
            ]
        },
        {
            "tags": "road_limited",
            "elements": "geometry.outline",
            "stylers": [
                {
                    "color": "#c8ccd0"
                },
                {
                    "zoom": 0,
                    "scale": 1
                },
                {
                    "zoom": 1,
                    "scale": 1
                },
                {
                    "zoom": 2,
                    "scale": 1
                },
                {
                    "zoom": 3,
                    "scale": 1
                },
                {
                    "zoom": 4,
                    "scale": 1
                },
                {
                    "zoom": 5,
                    "scale": 1
                },
                {
                    "zoom": 6,
                    "scale": 1
                },
                {
                    "zoom": 7,
                    "scale": 1
                },
                {
                    "zoom": 8,
                    "scale": 1
                },
                {
                    "zoom": 9,
                    "scale": 1
                },
                {
                    "zoom": 10,
                    "scale": 1
                },
                {
                    "zoom": 11,
                    "scale": 1
                },
                {
                    "zoom": 12,
                    "scale": 1
                },
                {
                    "zoom": 13,
                    "scale": 0.1
                },
                {
                    "zoom": 14,
                    "scale": 0.2
                },
                {
                    "zoom": 15,
                    "scale": 0.3
                },
                {
                    "zoom": 16,
                    "scale": 0.5
                },
                {
                    "zoom": 17,
                    "scale": 0.6
                },
                {
                    "zoom": 18,
                    "scale": 0.7
                },
                {
                    "zoom": 19,
                    "scale": 0.84
                },
                {
                    "zoom": 20,
                    "scale": 0.88
                },
                {
                    "zoom": 21,
                    "scale": 0.95
                }
            ]
        },
        {
            "tags": {
                "any": "landcover",
                "none": "vegetation"
            },
            "stylers": {
                "visibility": "off"
            }
        }
    ]
};