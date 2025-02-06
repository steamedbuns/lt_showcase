import argparse
import json
import requests

API_KEY_HEADER = 'lt_api_key'
LT_ALBUMS_URL = 'https://showcase.leantechniques.com/albums'

def main():
	parser = argparse.ArgumentParser(description='A command line tool to grab showcase albums and output the json results.')
	parser.add_argument('-k', '--key', action='store', help='API key provided by showcase pdf.')
	parser.add_argument('-o', '--output', action='store', help='File to output the results.')
	args = parser.parse_args()

	headers = {API_KEY_HEADER: args.key}
	r = requests.request('GET', LT_ALBUMS_URL, headers=headers)
	response_json = r.json()

	if args.output is not None:
		with open(args.output, 'w') as out_file:
			json.dump(response_json, out_file, indent=4)
	else:
		print(json.dumps(response_json, indent=4))

if __name__ == '__main__':
	main()