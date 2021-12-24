const bdType = 'FILE'
const configBD = {
  'FILE': './persistance/',
  'MONGO': 'mongodb://localhost/test',
  'FIREBASE': {
    "type": "service_account",
    "project_id": "proyect-demo-coderhouse",
    "private_key_id": "",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCHI7SlLobTrjeZ\nvORlIj/h9wYszgtMTcP0NntbdvPZZ1r+r0M6HpQY43epCBQbP/kd05DlK07v3rni\n5mNYZl2P2ROxLUZ12IvBQMJN6+7vJaRahtUkhXztb5zKa+jKmho0F+VO3pvkGera\ntaqqjfYyOQda+sqOIbY1kwQ8qcv6TVI3JDMag5av2oZ9eEOIrBj+Devucfrux2+F\n/1hf4sLGAvQYB0zj2IZqFzdSOAZAy/Q2Vbjk9NtgiUSX55/i5BsdSexqHjVY05tp\nfqC2zmB/mw8Gw+Vp4vnIvfr2KQaTRblFGSTX9CWE5aHkyokKwXAs8NKfZVFTUe4T\n+fLQStSXAgMBAAECggEAEJPlO6Qu/vWutWnSHMPsUURz2fg2s5gQkztBu7EmbcN7\niqWmWhFZOopg6ffnO4aIAUwsSKic6NkKNZbslfIMxTIsc74pmBhF4KGYlGV+bJDS\nDhbfO7kyX5AjDEPbjUsFLuHFi/zL49n4EPdbJcv/aR7M07DTO0dQalcMHIL51k0L\nR5F8hPwEh1BK5hO8C9XKP7OW8ZZiKXBirYmrPWzy5rhsgpqqH5TceMnBq/H2+mCJ\nUmqsSe89YMR7RY1bmcJN2M15Jx5t4CkM4sI8LGdjJCDpVYz70NTJFA+jdowvJRx1\nWti9opdo3u1/DNzvBhvjBlLs5aG5UzTXfmV+4gXN8QKBgQC7pi9tFTvCj2X0EO7l\nMwRAt2f2wmGcLJTiqyX23qGqOW7I8nqdlZLUtbuba/N0mmk5xOfSnhRLzpdEJt4k\n/rYagEWeAZZk7HbcmddVvHkgKeyE2i6hjUoYSGaxKrzt/rqZ6PwAq1sa4kLmxuBR\nhW9gHfIGw+/8Q34Ud1erI6rcxwKBgQC4XR+hj8N9WDvSRdv7C+3M/OvlTwx6NnQ0\nz+JaCOYD4LaFAY/IPynQaYEOr69bLAeCIXC+LvJJjC+uEC7f4IFAgKJ8l+Tf9a/G\nIAlnEx7k7fPIdbc+3kgZPztEDpcDkg5xdOqTV7o5ETbEyR48U+MypieQX4W7kOGJ\nO6xJH2FZsQKBgQCyNj06av0LZSbdqatIr6/tSoIJH0iWityHfSWcFIoS4WKuo2MC\nAEinjUT0cYyQhAlFXRURuSHrcPPGPOei2OjXuFTln/pWNSEZl12jxlB+1HIVJiU9\nNrNU5oXo4n71xIMxosyaUiM/H/2LsPrfUUuaTDZMaI+l0++Mvl7bYQ9nhwKBgApT\ntQzgt6uSwK8TmLHkRirAVBphJirGWBYJOv2eF/xJnw+uObaWyynQbxk6gBEUU0tX\nwi/1Az9ZaeZPI8EIm1TYn8Fo5Loi0fjAHKa4bHeYWJp29Y/A9brsTs6OHqlligeS\n6/za4iSGMVIujdIFROm2Yur0XtJV2DxOqmTiLBrRAoGBAId1/orStJrxu4snDeQT\nDITg9mEFePmFIrXhbD7vb9QCTdCaXsa6uQDKBxePBs+pxVJYn1CzFfESkq6fkQkz\ndxvHBhCZaor2lXHL38QfTlUUW9Bu1lXh6niLJM+OZmKV64gtO+CBfzzf0Zna5Fxk\nelcEpMmY5d5ynJ7fA5qM9Qbo\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-jyqfa@proyect-demo-coderhouse.iam.gserviceaccount.com",
    "client_id": "111125139711267978291",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jyqfa%40proyect-demo-coderhouse.iam.gserviceaccount.com"
  }
}

export { bdType, configBD }