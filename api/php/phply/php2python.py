#!/usr/bin/env python

from phplex import lexer
from phpparse import make_parser
import pythonast

from ast import Module
from unparse import Unparser

input = sys.stdin
output = sys.stdout

parser = make_parser()
body = [pythonast.from_phpast(ast)
        for ast in parser.parse(input.read(), lexer=lexer)]
Unparser(body, output)
