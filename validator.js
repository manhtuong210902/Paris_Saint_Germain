function Validator(formSelector){
    var _this = this
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    var formRules = {}
    var ValidatorRules = {
        //quy ước tạo rules
        //- nếu có lỗi thì return lại error msg
        //- nếu không có lỗi thì return undefined
        required: function(value){
            return value.trim() ? undefined : 'Please enter this field'
        },

        email: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regex.test(value) ? undefined : 'Please add valid email address'
        },

        min: function(min){
            return function(value){
                return value.length >= min? undefined:`Please enter at least ${min} characters`
            }
        },

        max: function(max){
            return function(value){
                return value.length <= max? undefined:`Please enter up to ${max} characters`
            }
        },

    }
    //lấy ra form element trong dom
    var formElement = document.querySelector(formSelector)
    //chỉ sử lí khi tồn tại form element trong DOM
    if(formElement){
        var inputs = formElement.querySelectorAll('[name][rules]')
        for(var input of inputs){
            var rules = input.getAttribute('rules').split('|')

            rules.forEach((rule) => {
                var isRuleHasValue = rule.includes(':')
                var ruleInfo = []

                if(isRuleHasValue){
                    ruleInfo = rule.split(':')
                    rule = ruleInfo[0]
                }

                var rulesFunc = ValidatorRules[rule]

                if(isRuleHasValue){
                    rulesFunc = rulesFunc(ruleInfo[1])
                }

                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(rulesFunc)
                }else{
                    formRules[input.name] = [rulesFunc]
                }
            })

            //lắng nghe sự kiện 
            input.onblur = handleValidate
            input.oninput = handleClearError
        }

        function handleValidate(event){
            var errorMsg;
            var formGroup = getParent(event.target, '.form-group')
            var formMsg = formGroup.querySelector('.form-message')
            var rules = formRules[event.target.name]

            for(var ruleFunc of rules){
                errorMsg = ruleFunc(event.target.value)
                if(errorMsg) break
            }

            if(errorMsg){
                formGroup.classList.add('invalid')
                formMsg.innerText = errorMsg
            }else{
                formGroup.classList.remove('invalid')
                formMsg.innerText = ''
            }

            return !errorMsg
        }

        function handleClearError(event){
            var formGroup = getParent(event.target, '.form-group')
            var formMsg = formGroup.querySelector('.form-message')

            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid')
                formMsg.innerText = ''
            }
        }

        //Xử lý hành vi submit form
        formElement.onsubmit = function(event){
            event.preventDefault()
            var inputs = formElement.querySelectorAll('[name][rules]')
            var isValid = true

            for(var input of inputs){
                if(!handleValidate({target:input})){
                    isValid = false
                }
            }

            if(isValid){
                if(typeof _this.onSubmit === 'function'){
                    formData = {}
                    for(var input of inputs){
                        formData[input.name] = input.value
                    }
                    _this.onSubmit(formData)
                }
                else{
                    formElement.submit()
                }
            }
        }
    }
}