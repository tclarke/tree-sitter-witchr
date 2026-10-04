module.exports = grammar({
  name: 'witchr',

  extras: $ => [
    /[ \t\r]/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat(
      choice(
        $.tape_header,
        $.fixed_point,
        $.memory_order,
        $.control_order,
        $.arithmetic_order,
        $.newline
      )
    ),

    comment: $ => /;[^\n]*/,

    newline: $ => '\n',

    // Tape headers: "tape1" (straight) or "tape2" (looped)
    tape_header: $ => seq(
      $.tape_name,
      optional($.tape_mode)
    ),

    tape_name: $ => /"[^"]+"/,

    tape_mode: $ => choice(
      '(straight)',
      '(looped)'
    ),

    // Fixed-point numbers: sign (+/-) followed by 8 digits with an optional '.' after the first digit
    fixed_point: $ => token(seq(
      choice('+', '-'),
      /\d/,
      optional('.'),
      /\d{7}/
    )),

    // Memory order reference: * followed by 5 digits
    memory_order: $ => token(seq(
      '*',
      /\d{5}/
    )),

    // Standard 5-digit orders split into Control (opcode 0) and Arithmetic (opcodes 1-7)
    control_order: $ => choice(
      $.op_noop,
      $.op_finish,
      $.op_signal,
      $.op_sign_test,
      $.op_transfer,
      $.op_search,
      $.op_layout,
      $.op_shift
    ),

    // Opcode 0 variants
    op_noop: $ => '00000',
    op_finish: $ => '00100',
    op_signal: $ => '00200',

    // Sign test: 01 1/2 dd
    op_sign_test: $ => token(seq(
      '01',
      choice('1', '2'),
      /\d{2}/
    )),

    // Transfer control: 02 1/2 rr
    op_transfer: $ => token(seq(
      '02',
      choice('1', '2'),
      /\d{2}/
    )),

    // Search: 0 3/5 b rr (b=block, rr=reader/store)
    op_search: $ => token(seq(
      '0',
      choice('3', '5'),
      /\d/,
      /\d{2}/
    )),

    // Set layout: 07 n 00 (or 07 n)
    op_layout: $ => token(seq(
      '07',
      /\d/,
      optional(/\d{2}/)
    )),

    // Set shift: 08 n 00
    op_shift: $ => token(seq(
      '08',
      /\d/,
      '00'
    )),

    // Arithmetic orders: Opcode (1-7), Source (2 digits), Dest (2 digits)
    arithmetic_order: $ => token(seq(
      /[1-7]/,
      /\d{2}/,
      /\d{2}/
    )),
  }
});
