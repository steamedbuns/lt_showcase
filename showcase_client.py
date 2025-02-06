import argparse
import json
import requests

API_KEY_HEADER = 'lt_api_key'
LT_ALBUMS_URL = 'https://showcase.leantechniques.com/albums'

def main():
	parser = argparse.ArgumentParser(description='A command line tool to grab showcase albums and output the json results.')
	parser.add_argument('-s', '--status-code', action='store_true', help='Flag indicates perform a request and output response code.')
	parser.add_argument('-k', '--key-file', action='store', required=True, help='File containing the API key provided by showcase pdf.')
	parser.add_argument('-o', '--output', action='store', help='File to output the results.')
	args = parser.parse_args()

	api_key = ''
	try:
		with open(args.key_file, 'r') as key_file:
			api_key = key_file.read().strip()
	except FileNotFoundError as e:
		print(e)
		exit()

	headers = {API_KEY_HEADER: api_key}
	r = requests.request('GET', LT_ALBUMS_URL, headers=headers)

	print(r.status_code)
	if args.status_code or r.status_code != 200:
		exit()
	response_json = r.json()

	if args.output is not None:
		with open(args.output, 'w') as out_file:
			json.dump(response_json, out_file, indent=4)
	else:
		print(json.dumps(response_json, indent=4))

if __name__ == '__main__':
	main()
