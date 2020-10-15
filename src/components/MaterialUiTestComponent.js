
//this is example of stateless component that is using Material UI components inside
import React from 'react';
import { Button, TextField } from '@material-ui/core'; //import Material IU elements from the package like that

const MaterialUiTestComponent = (props) => { //es 6 error function. method should return ONE element, that could contain several elements inside
    return <>
            <TextField name={props.fieldName}></TextField>
            <Button><text color="primary">{props.btnName}</text></Button>
        </>;
}

export default MaterialUiTestComponent; //export at least one element from the component. If these is only one element if the file use 'export default'

