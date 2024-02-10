
import { makeStyles } from "@material-ui/styles";

 const useStyles = makeStyles((theme) => ({
    textField: {
        '& .MuiInputBase-root': {
          color: 'rgb(85, 166, 246)',
        },
        '& .MuiFormLabel-root': {
          color: 'rgb(85, 166, 246)',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgb(85, 166, 246)',
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgb(85, 166, 246)',
        },

        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgb(85, 166, 246)',
        },
        '& .MuiOutlinedInput-input': {
          color: 'white',
        },
        '& .MuiInputLabel-root': {
          color: 'rgb(85, 166, 246)',
        },
    },
}));

export default useStyles;

