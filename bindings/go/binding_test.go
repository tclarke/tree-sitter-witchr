package tree_sitter_witchr_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_witchr "github.com/tclarke/tree-sitter-witchr/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_witchr.Language())
	if language == nil {
		t.Errorf("Error loading Witchr grammar")
	}
}
