// kebab-casify
let   an_ident
let  _an_ident
let   an_ident_
let  _an_ident_
let __an_ident
let   an_ident__
let __an_ident__

let ident_1
let ident_10
let ident_100_is_long

  (an_ident)   ;
 (_an_ident)   ;
  (an_ident_)  ;
 (_an_ident_)  ;
(__an_ident)   ;
  (an_ident__) ;
(__an_ident__) ;

let an__ident

let _
let __
let ___

let _p
let q_
let _r_
let s_t

let t_0
let t_1
let t_9

let obj: Record<string, any> = {};

obj.field
obj._field
obj.field_
obj._field_

obj.__field
obj.field__
obj.__field__

obj.a_field

let AN_IDENT
let an_Ident
let IDENT_1


// DualShift
1 + 2
3 * 4
5 + 6 * 7

1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13 + 14 + 15 + 16
1+-2+-3+-4+-5+-6+-7+-8+-9+-10+-11+-12+-13+-14+-15+-16

let x = {}
let { y = 5 } = { y: 1 }

/**
 * Documentation
 * 
 * - And this
 * - should not
 * - be DualShifted
 */
function a_func(a_param = null, another_param = 5)
{
	return 
}

class TestClass
{
	// to throw you off

	/**
	 * Documentation
	 * 
	 * - That should also
	 * - not be
	 * - DualShifted
	 */
	a_func(a_param: string = "1 + 2"): "3 + 4"
	{
	  return "3 + 4";
	}
}


// strings
"no kebab_casify, no Dual + Shift"
'no kebab_casify, no Dual + Shift'

let but_now_recover = 1 + 1

"don't do it"

let did_you_recover


// edge
1 / 2
1  /  2
