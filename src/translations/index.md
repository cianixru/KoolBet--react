При создании своих компонентов следует не забывать, что мы делаем интернациональный продукт и все тексты требуют перевода.     

* Переводы подтягиваются из json словарей src/translation/dictionaries туда же следует вручную добавлять новые строки

    > TODO Пока вручную, но есть идея сделать так чтобы новые строки попадали автоматически в словари, после билда. Пока не удалось завести этот кейс.

##### Пример 1. Базовый.
> было

    <Checkbox>    
        I confirm that I am over 18 years old.
    </Checkbox>
           
> стало

    import {FormattedMessage} from "react-intl";
        
    <Checkbox>
        <FormattedMessage id={"MainContainer.RegPage.Label.IConfirmThatIAmOver18yearsOld"} defaultMessage="I confirm that I am over 18 years old." />
    </Checkbox>    

##### Пример 2. Иногда строки текста выводятся в цикле из масива.
> было
 
    let Tabs = ['sport', 'live', 'results', 'virtual'];
    Tabs.map((val, index) => {
        return (
            <NavLink to={"/" + val}>
                {val}
            </NavLink>
        )
    })
    
> стало

    import messages from "./messages.lang";
    import {FormattedMessage} from "react-intl";
    
    let Tabs = ['sport', 'live', 'results', 'virtual'];
    Tabs.map((val, index) => {
        return (
            <NavLink to={"/" + val}>
                <FormattedMessage {...messages[val]} />
            </NavLink>
        )
    })
    
> файл ./messages.lang.js

    import { defineMessages } from 'react-intl'
    
    export default defineMessages({
        sport : { 
            id : "Header.ContentTabsRouter.MenuItem.sport", 
            defaultMessage : "Sport"
        },
        live : { 
            id : "Header.ContentTabsRouter.MenuItem.live", 
            defaultMessage : "Live"
        },
        ...
    })

##### Пример 3. В этом случае вызов компонента перевода, для атрибута placeholder, в стиле jsx, даёт некорректный результат. Здесь работает вызов компонента, как обычной js функции. 
> было
  
    <FormItem>
       {getFieldDecorator(e.name, {
           rules: [{ type: 'object', message: "Please input your birthday!" }]
       })(
           <DatePicker placeholder="Date of birthday" />
       )}
    </FormItem>
   
> стало 

    import messages from "./messages.lang";
    import {FormattedMessage} from "react-intl";

    <FormItem>
       {getFieldDecorator(e.name, {
           rules: [{ type: 'object', message: <FormattedMessage id="MainContainer.RegPage.Error.PleaseInputYourBirthday" defaultMessage="Please input your birthday!" /> }]
       })(
           <DatePicker placeholder={formatMessage(messages["Placeholder.DateOfBirth"])} />
       )}
    </FormItem>    