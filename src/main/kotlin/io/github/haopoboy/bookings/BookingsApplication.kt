package io.github.haopoboy.bookings

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BookingsApplication

fun main(args: Array<String>) {
	runApplication<BookingsApplication>(*args)
}
