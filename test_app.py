# test_app.py
import unittest
import json
from app import app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_analyze(self):
        response = self.client.post('/analyze', json={
            "sentence": "Shakespeare died in 1616."
        })
        
        self.assertEqual(response.status_code, 200)
        result = response.get_json()
        
        expected = {
            "item": {
                "subject": "Shakespeare",
                "verb": "died"
            }
        }
        self.assertEqual(result,expected)
        

if __name__ == '__main__':
    unittest.main()
