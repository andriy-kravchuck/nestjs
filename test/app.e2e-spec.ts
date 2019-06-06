import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/modules/app.module';
import { HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/user/dto/user.dto';

let app;

let token = '';

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
});


describe('AppController (e2e)', () => {
    it('hello world', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect('Hello World!');
    });
});

describe('UserController Create User (e2e)', () => { 
    it('get user without token', () => {
        return request(app.getHttpServer())
            .get('/user/')
            .expect(({ body }) => {
                expect(body.message).toEqual('Invalid token');
                expect(body.code).toBe(HttpStatus.UNAUTHORIZED);
            })
            .expect(HttpStatus.UNAUTHORIZED);
    });

    it('create user (success)', async () => {
        const user: CreateUserDTO = {
            email: "andriy.kravchuk@incorainc.com",
            password: "11112222",
            firstName: "Andrii",
            lastName: "Kravc4huk",
            phoneNumber: "380961769515",
            role: "user"
        };

        return await request(app.getHttpServer())
            .post('/user/register')
            .send(user)
            .expect(({ body }) => {
                expect(body.id).toBeDefined();
                expect(body.firstName).toBeDefined();
                expect(body.lastName).toBeDefined();
                expect(body.email).toBeDefined();
                expect(body.phoneNumber).toBeDefined();
                expect(body.role).toBeDefined();
                expect(body.created).toBeDefined();
                expect(body.token).toBeUndefined();
            })
            .expect(HttpStatus.CREATED);
    });

    it('create user (fail unique email)', async () => {
        const user: CreateUserDTO = {
            email: "andriy.kravchuk@incorainc.com",
            password: "11112222",
            firstName: "Andrii",
            lastName: "Kravc4huk",
            phoneNumber: "3809617695152",
            role: "user"
        };

        return await request(app.getHttpServer())
            .post('/user/register')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toContain('duplicate key value violates unique constraint');
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('create user (fail unique phoneNumber)', async () => {
        const user: CreateUserDTO = {
            email: "andriy.kravchuk2@incorainc.com",
            password: "11112222",
            firstName: "Andrii",
            lastName: "Kravc4huk",
            phoneNumber: "380961769515",
            role: "user"
        };

        return await request(app.getHttpServer())
            .post('/user/register')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toContain('duplicate key value violates unique constraint');
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('create user (fail unique email and phoneNumber)', async () => {
        const user: CreateUserDTO = {
            email: "andriy.kravchuk@incorainc.com",
            password: "11112222",
            firstName: "Andrii",
            lastName: "Kravc4huk",
            phoneNumber: "380961769515",
            role: "user"
        };

        return await request(app.getHttpServer())
            .post('/user/register')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toContain('duplicate key value violates unique constraint');
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    describe('create user (fail field)', () => {
        it('firstName (doesn\'t exist)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                lastName: "Kravc4huk",
                phoneNumber: "380961769515",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.firstName).toBeDefined();
                    expect(body.message.firstName).toContain("firstName must be a string");
                    expect(body.message.firstName).toContain("firstName must be longer than or equal to 6 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('firstName (is not string)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                firstName: 354352.234,
                lastName: "Kravc4huk",
                phoneNumber: "380961769515",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.firstName).toBeDefined();
                    expect(body.message.firstName).toContain("firstName must be a string");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('firstName (must be a longer then 5 character)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                firstName: '12345',
                lastName: "Kravc4huk",
                phoneNumber: "380961769515",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.firstName).toBeDefined();
                    expect(body.message.firstName).toContain("firstName must be longer than or equal to 6 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });




        it('lastName (doesn\'t exist)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                firstName: 'Andrii',
                phoneNumber: "380961769515",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.lastName).toBeDefined();
                    expect(body.message.lastName).toContain("lastName must be a string");
                    expect(body.message.lastName).toContain("lastName must be longer than or equal to 6 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('lastName (is not string)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                firstName: "Andrii",
                lastName: 354352.234,
                phoneNumber: "380961769515",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.lastName).toBeDefined();
                    expect(body.message.lastName).toContain("lastName must be a string");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('lastName (must be a longer then 5 character)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                firstName: 'Andrii',
                lastName: "12345",
                phoneNumber: "380961769515",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.lastName).toBeDefined();
                    expect(body.message.lastName).toContain("lastName must be longer than or equal to 6 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });


        it('phoneNumber (doesn\'t exist)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                firstName: 'Andrii',
                lastName: 'Kravchuck',
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.phoneNumber).toBeDefined();
                    expect(body.message.phoneNumber).toContain("phoneNumber must be a string");
                    expect(body.message.phoneNumber).toContain("phoneNumber must be longer than or equal to 8 characters");
                    expect(body.message.phoneNumber).toContain("phoneNumber must be shorter than or equal to 15 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('phoneNumber (is not string)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                firstName: "Andrii",
                lastName: "Kravchuck",
                phoneNumber: 380961769515,
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.phoneNumber).toBeDefined();
                    expect(body.message.phoneNumber).toContain("phoneNumber must be a string");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('phoneNumber (must be a longer then 7 character)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                firstName: 'Andrii',
                lastName: "Kravchuck",
                phoneNumber: "1234567",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.phoneNumber).toBeDefined();
                    expect(body.message.phoneNumber).toContain("phoneNumber must be longer than or equal to 8 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('phoneNumber (must be a longer then 7 character)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                password: "11112222",
                firstName: 'Andrii',
                lastName: "Kravchuck",
                phoneNumber: "1234567890123456",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.phoneNumber).toBeDefined();
                    expect(body.message.phoneNumber).toContain("phoneNumber must be shorter than or equal to 15 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });




        it('email (doesn\'t exist)', async () => {
            const user = {
                password: "11112222",
                firstName: 'Andrii',
                lastName: 'Kravchuck',
                phoneNumber: "380961769515",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.email).toBeDefined();
                    expect(body.message.email).toContain("email must be longer than or equal to 10 characters");
                    expect(body.message.email).toContain("email must be an email");
                    expect(body.message.email).toContain("email must be a string");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('email (is not string)', async () => {
            const user = {
                email: 843758943,
                password: "11112222",
                firstName: "Andrii",
                lastName: "Kravchuck",
                phoneNumber: "380961769515",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.email).toBeDefined();
                    expect(body.message.email).toContain("email must be a string");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('email (must be a longer then 9 character)', async () => {
            const user = {
                email: "3@om.com",
                password: "11112222",
                firstName: 'Andrii',
                lastName: "Kravchuck",
                phoneNumber: "1234567",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.email).toBeDefined();
                    expect(body.message.email).toContain("email must be longer than or equal to 10 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('email (must be a an email)', async () => {
            const user = {
                email: "andriy.kravchukincorainc.com",
                password: "11112222",
                firstName: 'Andrii',
                lastName: "Kravchuck",
                phoneNumber: "1234567890123456",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.email).toBeDefined();
                    expect(body.message.email).toContain("email must be an email");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });


        it('password (doesn\'t exist)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                firstName: 'Andrii',
                lastName: "Kravchuck",
                phoneNumber: "1234567890123456",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.password).toBeDefined();
                    expect(body.message.password).toContain("password must be longer than or equal to 6 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });

        it('password (must be a longer then 5 character)', async () => {
            const user = {
                email: "andriy.kravchuk@incorainc.com",
                firstName: 'Andrii',
                password: "12345",
                lastName: "Kravchuck",
                phoneNumber: "1234567890123456",
                role: "user"
            };
    
            return await request(app.getHttpServer())
                .post('/user/register')
                .send(user)
                .expect(({ body }) => {
                    expect(body.message.password).toBeDefined();
                    expect(body.message.password).toContain("password must be longer than or equal to 6 characters");
                })
                .expect(HttpStatus.UNPROCESSABLE_ENTITY);
        });
    });

    it('login (success)', async () => {
        const user = {
            email: "andriy.kravchuk@incorainc.com",
            password: "11112222"
        };

        return await request(app.getHttpServer())
            .post('/user/login')
            .send(user)
            .expect(({ body }) => {
                expect(body.id).toBeDefined();
                expect(body.firstName).toBeDefined();
                expect(body.lastName).toBeDefined();
                expect(body.email).toBeDefined();
                expect(body.phoneNumber).toBeDefined();
                expect(body.role).toBeDefined();
                expect(body.created).toBeDefined();
                this.token = body.token;
                expect(body.token).toBeDefined();
            })
            .expect(HttpStatus.OK);
    });

    it('login (fail wrong password)', async () => {
        const user = {
            email: "andriy.kravchuk@incorainc.com",
            password: "111122"
        };

        return await request(app.getHttpServer())
            .post('/user/login')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toBeDefined();
                expect(body.message).toContain("Invalid username/passwrod");
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('login (fail password empty)', async () => {
        const user = {
            email: "andriy.kravchuk@incorainc.com"
        };

        return await request(app.getHttpServer())
            .post('/user/login')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toBeDefined();
                expect(body.message.password).toContain("password must be longer than or equal to 6 characters");
                expect(body.message.password).toContain("password should not be empty");
                expect(body.message.password).toContain("password must be a string");
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('login (fail password must be Londet then 5 character)', async () => {
        const user = {
            email: "andriy.kravchuk@incorainc.com",
            password: '12345'
        };

        return await request(app.getHttpServer())
            .post('/user/login')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toBeDefined();
                expect(body.message.password).toContain("password must be longer than or equal to 6 characters");
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('login (fail password can\'t be empty)', async () => {
        const user = {
            email: "andriy.kravchuk@incorainc.com",
            password: ''
        };

        return await request(app.getHttpServer())
            .post('/user/login')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toBeDefined();
                expect(body.message.password).toContain("password should not be empty");
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('login (fail password must be a string)', async () => {
        const user = {
            email: "andriy.kravchuk@incorainc.com",
            password: 123436546789
        };

        return await request(app.getHttpServer())
            .post('/user/login')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toBeDefined();
                expect(body.message.password).toContain("password must be a string");
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('login (fail email must be a string)', async () => {
        const user = {
            email: 123453,
            password: "11112222"
        };

        return await request(app.getHttpServer())
            .post('/user/login')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toBeDefined();
                expect(body.message.email).toContain("email must be a string");
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('login (fail email is not a eamil)', async () => {
        const user = {
            email: "andriykravchuckincorainc.com",
            password: "11112222"
        };

        return await request(app.getHttpServer())
            .post('/user/login')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toBeDefined();
                expect(body.message.email).toContain("email must be an email");
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });

    it('login (fail email can\'t be empty)', async () => {
        const user = {
            eamil: '',
            password: "11112222"
        };

        return await request(app.getHttpServer())
            .post('/user/login')
            .send(user)
            .expect(({ body }) => {
                expect(body.message).toBeDefined();
                expect(body.message.email).toContain("email should not be empty");

                console.log(this. token);
            })
            .expect(HttpStatus.UNPROCESSABLE_ENTITY);
    });
});
