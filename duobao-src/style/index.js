/**
 * Created by cjy on 16/11/23.
 */
import {vars, fns} from './vars';

export default {
    center: fns.flex('column', 'wrap', 'center', 'center'),
    primary: {
        color: vars.primary
    },
    primaryBg: {
        backgroundColor: vars.primary,
        color: '#fff'
    },
    flex: {
        flex: 1
    }
}