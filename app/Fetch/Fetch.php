<?php


namespace App\Fetch;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ServerException;

class Fetch
{
    private $_data ;
    public function __construct($options=[])
    {
        $this->_data = $options;

        //default_headers
        $header_options = [];

        if(isset($options['headers'])){
            array_merge($header_options,$options['headers']);
        }
        if(isset($options['verify'])){
            array_merge($header_options,['verify'=>$options['verify']]);
        }

        $this->client = new Client($header_options);

        $this->bodyFormat = 'json';
        $this->options = [
            'http_errors' => false,
        ];
    }


    public function asJson()
    {
        return $this->bodyFormat('json')->contentType('application/json');
    }

    public function asFormParams()
    {
        return $this->bodyFormat('form_params')->contentType('application/x-www-form-urlencoded');
    }

    public function bodyFormat($format)
    {
        return tap($this, function ($request) use ($format) {
            $this->bodyFormat = $format;
        });
    }

    public function contentType($contentType)
    {
        return $this->withHeaders(['Content-Type' => $contentType]);
    }

    public function accept($header)
    {
        return $this->withHeaders(['Accept' => $header]);
    }

    public function withHeaders($headers)
    {
        return tap($this, function ($request) use ($headers) {
            return $this->options = array_merge_recursive($this->options, [
                'headers' => $headers
            ]);
        });
    }

    public function get($url, $queryParams = [])
    {
        return $this->send('GET', $url, [
            'query' => $queryParams,
            'verify' => false
        ]);
    }

    public function post($url, $params = [], $verify = true)
    {
        return $this->send('POST', $url, [
            $this->bodyFormat => $params,
            'verify'=>$verify
        ]);
    }

    public function patch($url, $params = [])
    {
        return $this->send('PATCH', $url, [
            $this->bodyFormat => $params,
        ]);
    }

    public function put($url, $params = [])
    {
        return $this->send('PUT', $url, [
            $this->bodyFormat => $params,
        ]);
    }

    public function delete($url, $params = [])
    {
        return $this->send('DELETE', $url, [
            $this->bodyFormat => $params,
        ]);
    }

    public function send($method, $url, $options)
    {
        try{
            return new Response($this->client->request($method, $url, $this->mergeOptions([
                'query' => $this->parseQueryParams($url),
            ], $options)));

        }catch (\Exception $ex){
            throw $ex;
        }

    }

    protected function mergeOptions(...$options)
    {
        return array_merge_recursive($this->options, ...$options);
    }

    protected function parseQueryParams($url)
    {
        return tap([], function (&$query) use ($url) {
            parse_str(parse_url($url, PHP_URL_QUERY), $query);
        });
    }
}

class Response
{
    public function __construct($response)
    {
        $this->response = $response;
    }

    public function body()
    {
        return (string)$this->response->getBody();
    }

    public function json($asArray = true)
    {
        return json_decode($this->response->getBody(), $asArray);
    }

    public function header($header, $asArray = false)
    {
        return $this->response->getHeader($header, $asArray);
    }

    public function headers()
    {
        return $this->response->getHeaders();
    }

    public function status()
    {
        return $this->response->getStatusCode();
    }

    public function __call($method, $args)
    {
        return $this->response->{$method}(...$args);
    }
}

function tap($value, $callback)
{
    $callback($value);

    return $value;
}

