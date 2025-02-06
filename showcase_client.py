import argparse
import json
import requests

api_key = ''

def main():
	parser = argparse.ArgumentParser(description='A command line tool to grab showcase albums and output the json results.')
	parser.add_argument('-k', '--key', action='store', help='API key provided by showcase pdf.')
	parser.add_argument('-o', '--output', action='store', help='File to output the results.')
	args = parser.parse_args()
	api_key = args.key

	url = 'https://showcase.leantechniques.com/albums'
	headers = {'lt_api_key': api_key}
	r = requests.request('GET', url, headers=headers)
	response_json = r.json()
	if args.output is not None:
		with open(args.output, 'w') as f:
			json.dump(response_json, f, indent=4)
	else:
		print(json.dumps(response_json, indent=4))

if __name__ == '__main__':
	main()