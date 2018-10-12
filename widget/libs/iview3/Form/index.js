import Input from './Input'
import Radio from './Radio'
import Checkbox from './checkbox'
import Switch from './switch'
import Select from './select'
import Silder from './slider'
import DatePicker from './datepicker'
import TimePicker from './timepicker'
import InputNumber from './inputnumber'
import Form from './form'

export default [].concat(
    Form.widgets,
    Input.widgets,
    Radio.widgets,
    Checkbox.widgets,
    Switch.widgets,
    Select.widgets,
    Silder.widgets,
    DatePicker.widgets,
    InputNumber.widgets,
    TimePicker.widgets
)