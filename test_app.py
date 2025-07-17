# test_app.py
import unittest
import json
from app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_analyze(self):
        response = self.client.post('/analyze', json={
           'sentence': 'Einstein developed the theory of relativity.'
        })
        self.assertEqual(response.status_code, 200)
        result = response.get_json()
        
        expectedAnswers = []
        expected = {
            "noun": "Einstein",
            "verb": "developed",
            "object": "the theory of relativity",
            "sentence": "Einstein developed the theory of relativity.",
            "question": "who developed the theory of relativity?",
            "answer": "Einstein",
        }
        expectedAnswers.append(expected)
        
        self.assertEqual(result,expectedAnswers)

if __name__ == '__main__':
    unittest.main()
