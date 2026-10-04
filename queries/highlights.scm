;; Comments
(comment) @comment

;; Tape headers
(tape_name) @string
(tape_mode) @keyword.directive

;; Literals / Numbers
(fixed_point) @constant.numeric.float
(memory_order) @constant.numeric.integer

;; Control orders (Opcode 0)
(op_noop) @comment.unused
(op_finish) @keyword.control
(op_signal) @keyword.control
(op_sign_test) @keyword.control.conditional
(op_transfer) @keyword.control.jump
(op_search) @keyword.control
(op_layout) @function.builtin
(op_shift) @function.builtin

;; Arithmetic orders (Opcodes 1-7)
(arithmetic_order) @keyword.operator
